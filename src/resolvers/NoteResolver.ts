import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Root,
  FieldResolver,
  Authorized,
  Ctx
} from 'type-graphql';
import { NoteService } from '../services/NoteService';
import { Container, Service } from 'typedi';
import { UserEntity } from '../entities/user.entity';
import { ProjectEntity } from '../entities/project.entity';
import {
  NoteEntity,
  NoteInput,
  NoteMutationReturn
} from '../entities/note.entity';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@Service()
@Resolver(() => NoteEntity)
export class NoteResolver {
  private noteService = Container.get(NoteService);

  @Authorized()
  @Query(() => [NoteEntity])
  async notes() {
    return await this.noteService.getAllNotes();
  }

  @Authorized()
  @FieldResolver(() => ProjectEntity)
  async project(@Root() note: NoteEntity) {
    return await this.noteService.getProject(note.id);
  }

  @Authorized()
  @FieldResolver(() => UserEntity)
  async user(@Root() note: NoteEntity) {
    return await this.noteService.getUser(note.id);
  }

  // TODO: This needs to be authorized
  @Mutation(() => NoteMutationReturn)
  async createNote(
    @Arg('noteInput') { title, content, projectId, id }: NoteInput,
    @Ctx() ctx: DecodedIdToken
  ) {
    return await this.noteService.create({
      id,
      title,
      content,
      projectId,
      userEmail: ctx.email
    });
  }
}
