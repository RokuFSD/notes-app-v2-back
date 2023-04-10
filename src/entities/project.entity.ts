import { ArgsType, Field, ID, InputType, ObjectType } from 'type-graphql';
import { NoteEntity } from './note.entity';
import { UserEntity } from './user.entity';

@ObjectType()
export class ProjectEntity {
  @Field(() => ID)
  id: string;
  @Field()
  title: string;
  @Field()
  createdDate: Date;
  @Field()
  updatedDate: Date;

  @Field(() => UserEntity)
  user: UserEntity;
  @Field(() => [NoteEntity])
  notes: NoteEntity[];
}

@InputType()
@ArgsType()
export class ProjectArgs {
  @Field({ nullable: true })
  id?: string;

  @Field()
  title: string;
}
