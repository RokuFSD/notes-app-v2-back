import { Project } from '../entities/Project';
import { AppDataSource } from '../data-source';

export const ProjectRepository = AppDataSource.getRepository(Project);