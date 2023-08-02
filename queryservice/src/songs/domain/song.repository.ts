import ISong from './song';

interface ISongRepository {
  persist(song: ISong): Promise<void>;
  findById(id: string): Promise<ISong>;
}

export default ISongRepository;
