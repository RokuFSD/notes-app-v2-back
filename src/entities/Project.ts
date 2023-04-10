import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { User } from './User';
import { Note } from './Note';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() title: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne((type) => User, (user) => user.projects)
  user: User;

  @OneToMany((type) => Note, (note) => note.project)
  notes: Note[];
}
