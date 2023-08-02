import { ISong } from 'src/songs/domain';

export interface ICreateSongEvent {
  execute: (song: ISong) => Promise<void>;
}
