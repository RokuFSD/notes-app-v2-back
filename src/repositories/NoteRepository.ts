import { Note } from '../entities/Note';
import { AppDataSource } from '../data-source';

export const NoteRepository = AppDataSource.getRepository(Note);
