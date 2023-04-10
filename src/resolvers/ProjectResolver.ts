import { Container, Service } from 'typedi';
import { ProjectArgs, ProjectEntity } from '../entities/project.entity';
import { ProjectService } from '../services/ProjectService';
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { UserEntity } from '../entities/user.entity';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@Service()
@Resolver(() => ProjectEntity)
export class ProjectResolver {
  private projectService = Container.get(ProjectService);

  @Authorized()
  @Query(() => [ProjectEntity])
  async projects() {
    return await this.projectService.getAllProjects();
  }

  @Authorized()
  @Query(() => ProjectEntity)
  async project(@Arg('id') id: string) {
    return await this.projectService.getProject(id);
  }

  @Authorized()
  @FieldResolver()
  async notes(@Root() project: ProjectEntity) {
    return await this.projectService.getNotes(project.id);
  }

  @Authorized()
  @FieldResolver((type) => UserEntity)
  async user(@Root() project: ProjectEntity) {
    console.log(project);
    return await this.projectService.getUser(project.id);
  }

  // TODO: This needs to be authorized
  @Mutation(() => ProjectEntity)
  // async createProject(@Arg('title') title: string, @Ctx() ctx: DecodedIdToken) {
  async createProject(
    @Args() { title, id }: ProjectArgs,
    @Ctx() ctx: DecodedIdToken
  ) {
    return await this.projectService.create({
      id,
      title,
      userEmail: ctx.email,
    });
  }
}
