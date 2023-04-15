import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Note } from './entities/Note';
import { Project } from './entities/Project';
import config from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.postgresHOST,
  port: config.postgresPORT,
  username: config.postgresUSER,
  password: config.postgresPASSWORD,
  database: config.postgresDB,
  synchronize: true,
  logging: false,
  entities: [User, Note, Project],
  migrations: [],
  subscribers: []
});

export async function initialize() {
  await AppDataSource.initialize();
  console.log('Database initialized');
}
