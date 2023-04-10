import { Container, Service } from 'typedi';
import { Repository } from 'typeorm';
import { Project } from '../entities/Project';
import { User } from '../entities/User';

@Service()
export class ProjectService {
  private projectRepository = Container.get(
    'ProjectRepository'
  ) as Repository<Project>;
  private userRepository = Container.get('UserRepository') as Repository<User>;

  async getAllProjects() {
    return await this.projectRepository.find({});
  }

  async getProject(project: Project['id']) {
    return await this.projectRepository.findOne({
      where: { id: project },
    });
  }

  async getNotes(projectId: Project['id']) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: {
        notes: true,
      },
    });
    return project.notes;
  }

  async getUser(projectId: Project['id']) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: {
        user: true,
      },
    });
    return project.user;
  }

  async create({
    title,
    userEmail,
    id,
  }: {
    title: string;
    userEmail: string;
    id?: string;
  }) {
    const project = new Project();
    const user = await this.userRepository.findOne({
      // Temp fixed email for testing
      where: { email: 'emilianordx@gmail.com' },
    });
    if (!user) throw new Error('User not found');
    if (id) project.id = id;
    project.title = title;
    project.notes = [];
    project.user = user;
    return await this.projectRepository.save(project);
  }
}
