import { Container, Service } from 'typedi';
import { UserService } from '../services/UserService';
import {
  Mutation,
  Arg,
  FieldResolver,
  Query,
  Resolver,
  Root,
  Authorized,
  Ctx,
} from 'type-graphql';
import { UserEntity, UserMutationReturn } from '../entities/user.entity';
import { NoteEntity } from '../entities/note.entity';
import { ProjectEntity } from '../entities/project.entity';
import { auth } from 'firebase-admin';
import DecodedIdToken = auth.DecodedIdToken;

@Service()
@Resolver(() => UserEntity)
export class UserResolver {
  private userService = Container.get(UserService);

  @Authorized()
  @Query(() => UserEntity)
  async user(@Ctx() ctx: DecodedIdToken) {
    return await this.userService.getUser(ctx.email);
  }

  @Authorized()
  @FieldResolver(() => [NoteEntity])
  async notes(@Root() user: UserEntity) {
    return await this.userService.getNotes(user.id);
  }

  @Authorized()
  @FieldResolver(() => [ProjectEntity])
  async projects(@Root() user: UserEntity) {
    return await this.userService.getProjects(user.id);
  }

  @Mutation(() => UserMutationReturn)
  async createUser(@Arg('email') email: string) {
    return await this.userService.create({ email });
  }

  @Query(() => Boolean)
  async exists(@Arg('email') email: string) {
    return !!(await this.userService.getUserByEmail(email));
  }
}
