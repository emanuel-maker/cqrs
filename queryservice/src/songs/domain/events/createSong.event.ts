import ISong from '../song';

export interface ICreateSongEvent {
  execute: (song: ISong) => Promise<void>;
}
