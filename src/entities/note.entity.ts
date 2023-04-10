import { ArgsType, Field, ID, InputType, ObjectType } from 'type-graphql';
import { UserEntity } from './user.entity';
import { ProjectEntity } from './project.entity';

@ObjectType()
export class NoteEntity {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  createdDate: Date;

  @Field()
  updatedDate: Date;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => ProjectEntity)
  project: ProjectEntity;
}

@InputType()
@ArgsType()
export class NoteInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  projectId: string;
}

@ObjectType()
export class NoteMutationReturn {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;
}
