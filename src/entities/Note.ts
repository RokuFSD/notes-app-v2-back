import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './User';
import { Project } from './Project';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() title: string;

  @Column() content: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @ManyToOne(() => Project, (project) => project.notes)
  project: Project;
}
