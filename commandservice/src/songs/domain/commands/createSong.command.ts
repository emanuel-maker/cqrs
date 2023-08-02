import { ICommand } from '@nestjs/cqrs';
import ISong from '../song';

export class CreateSongCommand implements ICommand {
  constructor(readonly song: ISong) {}
}
