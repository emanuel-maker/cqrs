import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindSongByIdQuery } from '../../application/queries/FindSongById.query';
import FindSongByIdDTOResponse from './dto/FindSongById.dto.response';
import { ApiResponse } from '@nestjs/swagger';

@Controller('songs')
export class SongController {
  constructor(private queryBus: QueryBus) {}

  @Get('song/:id')
  @ApiResponse({
    type: FindSongByIdDTOResponse,
  })
  async getById(@Param('id') id: string): Promise<FindSongByIdDTOResponse> {
    return this.queryBus.execute(new FindSongByIdQuery(id));
  }
}
