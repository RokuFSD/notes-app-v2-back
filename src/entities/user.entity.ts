import { Field, ObjectType, ID, Authorized } from 'type-graphql';
import { NoteEntity } from './note.entity';
import { ProjectEntity } from './project.entity';

@ObjectType()
export class UserEntity {
  @Authorized()
  @Field(() => ID)
  id: number;
  @Field()
  email: string;
  @Field(() => [NoteEntity])
  notes: NoteEntity[];
  @Field(() => [ProjectEntity])
  projects: ProjectEntity[];
}

@ObjectType()
export class UserMutationReturn {
  @Field()
  email: string;
}
