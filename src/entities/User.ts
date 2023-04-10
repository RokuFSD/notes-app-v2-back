import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Note } from './Note';
import { Project } from './Project';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  email: string;

  @OneToMany((type) => Note, (note) => note.user)
  notes: Note[];

  @OneToMany((type) => Project, (project) => project.user)
  projects: Project[];
}
