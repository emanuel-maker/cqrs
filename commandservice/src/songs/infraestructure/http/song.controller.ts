import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateSongDto } from './dto/CreateSong.dto.request';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSongCommand } from '../../application/commands/create.song/CreateSong.command';
import {
  SongTittle,
  SongAuthorId,
  SongDescription,
  SongVersion,
} from '../../domain/song';

@Controller('songs')
export class SongController {
  constructor(private commandBus: CommandBus) {}
  @Post('song')
  async create(@Body() createSongDto: CreateSongDto): Promise<void> {
    const { title, authorId, version, description } = createSongDto;

    try {
      // creamos los valueObjects de nuestro dominio
      const songTittle = new SongTittle(title);
      const songAuthorId = new SongAuthorId(authorId);
      const songDescription = new SongDescription(description);
      const songVersion = new SongVersion(version);
      // no sabe quien gestionara, simplemente lo crea, bajo acoplamiento
      await this.commandBus.execute(
        new CreateSongCommand(
          songTittle,
          songAuthorId,
          songDescription,
          songVersion,
        ),
      );
    } catch (error: any) {
      // crear tipos de errores, y lanzar dependiendo de si es o no bad request
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, {
        cause: new Error(error.message),
      });
    }
  }
}
