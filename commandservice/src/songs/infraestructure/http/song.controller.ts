import { Body, Controller, Post } from '@nestjs/common';
import { CreateSongDto } from './dto/song.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSongCommand } from 'src/songs/domain/commands/createSong.command';

@Controller('songs')
export class SongController {
  constructor(private commandBus: CommandBus) {}
  @Post()
  async create(@Body() createSongDto: CreateSongDto): Promise<void> {
    this.commandBus.execute(new CreateSongCommand(createSongDto));
  }
}
