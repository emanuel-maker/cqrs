import { ICommand } from '@nestjs/cqrs';
import { ISong } from 'src/songs/domain';

export class CreateSongCommand implements ICommand {
  constructor(readonly song: ISong) {}
}
