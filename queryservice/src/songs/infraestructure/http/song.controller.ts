import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindSongByIdQuery } from 'src/songs/domain/queries/findSongById.query';

@Controller('songs')
export class SongController {
  constructor(private queryBus: QueryBus) {}

  @Get('song/:id')
  async getById(@Param('id') id: string) {
    return this.queryBus.execute(new FindSongByIdQuery(id));
  }
}
