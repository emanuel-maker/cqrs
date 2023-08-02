import { Body, Controller, Post } from '@nestjs/common';
import { CreateSongDto } from './dto/CreateSong.dto.request';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSongCommand } from 'src/songs/application/commands/CreateSong.command';

@Controller('songs')
export class SongController {
  constructor(private commandBus: CommandBus) {}
  @Post('song')
  async create(@Body() createSongDto: CreateSongDto): Promise<void> {
    this.commandBus.execute(new CreateSongCommand(createSongDto));
  }
}
