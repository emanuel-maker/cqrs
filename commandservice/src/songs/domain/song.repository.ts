import Song from './song';

interface ISongRepository {
  persist(song: Song): Promise<void>;
}

export default ISongRepository;
