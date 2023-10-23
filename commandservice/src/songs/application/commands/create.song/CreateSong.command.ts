import { ICommand } from '@nestjs/cqrs';
import {
  SongTittle,
  SongAuthorId,
  SongDescription,
  SongVersion,
} from '../../../domain/song';

export class CreateSongCommand implements ICommand {
  constructor(
    readonly songTittle: SongTittle,
    readonly songAuthorId: SongAuthorId,
    readonly songDescription: SongDescription,
    readonly songVersion: SongVersion,
  ) {}
}
// desacoplar remitente de receptores
