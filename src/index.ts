import * as http from 'http';
import app from './express/app';
import config from './config';
import { Container } from 'typedi';
import { ApolloServer } from '@apollo/server';
import { initialize } from './data-source';
import { buildSchema } from 'type-graphql';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  NoteRepository,
  ProjectRepository,
  UserRepository
} from './repositories';
import { NoteResolver, ProjectResolver, UserResolver } from './resolvers';
import { customAuthChecker } from './directives';
import { auth } from './firebase';

const httpServer = http.createServer(app);

async function setupGraphQL() {
  Container.set('NoteRepository', NoteRepository);
  Container.set('UserRepository', UserRepository);
  Container.set('ProjectRepository', ProjectRepository);

  const schema = await buildSchema({
    resolvers: [NoteResolver, ProjectResolver, UserResolver],
    container: Container,
    validate: { forbidUnknownValues: false },
    authChecker: customAuthChecker
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Simply pass an empty email if the request is not authenticated
        if (!req.headers.authorization) {
          return { email: 'emilianordx@gmail.com' };
        }
        // Get the token from the headers
        const token = req.headers.authorization || '';
        // Remove the Bearer part from the token split it and get the token
        const tokenValue = token.split(' ')[1];
        // Check if the token is valid
        try {
          return await auth.verifyIdToken(tokenValue);
        } catch (e) {
          throw new Error('Unauthorized');
        }
      }
    })
  );
}

async function startServer() {
  httpServer
  .listen(config.port as number)
  .on('error', (error) => {
    console.log('Error starting server: ', error);
  })
  .on('listening', () => {
    console.log(`Server started at port ${config.port}`);
  })
  .on('close', () => {
    console.log('Server closed');
  });
}

(async () => {
  try {
    await initialize();
    await setupGraphQL();
    await startServer();
  } catch (error) {
    console.log('Error starting server: ', error);
  }
})();
