import { ISong } from '../../domain';

export interface ICreateSongEvent {
  execute: (song: ISong) => Promise<void>;
}
