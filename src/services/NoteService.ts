import { Container, Service } from 'typedi';
import { Note } from '../entities/Note';
import { Repository } from 'typeorm';
import { NoteInput } from '../entities/note.entity';
import { Project } from '../entities/Project';
import { User } from '../entities/User';

@Service()
export class NoteService {
  private userRepository = Container.get('UserRepository') as Repository<User>;
  private noteRepository = Container.get('NoteRepository') as Repository<Note>;
  private projectRepository = Container.get(
    'ProjectRepository'
  ) as Repository<Project>;

  async getAllNotes() {
    return await this.noteRepository.find({});
  }

  async create({
    id,
    title,
    content,
    projectId,
    userEmail,
  }: NoteInput & { userEmail: string }) {
    // Retrieve Project
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });
    const user = await this.userRepository.findOne({
      // Temp fixed email for testing
      where: { email: 'emilianordx@gmail.com' },
    });
    if (!project) throw new Error('Project not found!');
    if (!user) throw new Error('User not found!');

    const note = new Note();
    if (id) note.id = id;
    note.title = title;
    note.content = content;
    note.project = project;
    note.user = user;

    return await this.noteRepository.save(note);
  }

  async getProject(noteId: Note['id']) {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: { project: true },
    });
    return note.project;
  }

  async getUser(noteId: Note['id']) {
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: { user: true },
    });
    return note.user;
  }
}
