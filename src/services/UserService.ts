import { Container, Service } from 'typedi';
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { UserMutationReturn } from '../entities/user.entity';

@Service()
export class UserService {
  private userRepository = Container.get('UserRepository') as Repository<User>;

  async getUser(email: User['email']) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getNotes(userId: User['id']) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { notes: true },
    });

    return user.notes;
  }

  async getProjects(userId: User['id']) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { projects: true },
    });

    return user.projects;
  }

  async create(user: Partial<User>): Promise<UserMutationReturn> {
    const newUser = new User();
    newUser.email = user.email;
    newUser.notes = [];
    newUser.projects = [];
    await this.userRepository.save(newUser);
    return { email: newUser.email };
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
