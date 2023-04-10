import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Note } from './entities/Note';
import { Project } from './entities/Project';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'note_app',
  synchronize: true,
  logging: false,
  entities: [User, Note, Project],
  migrations: [],
  subscribers: [],
});

export async function initialize() {
  await AppDataSource.initialize();
  console.log('Database initialized');
}
