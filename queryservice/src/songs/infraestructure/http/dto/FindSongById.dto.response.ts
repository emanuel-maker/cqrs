import { FindSongResult } from '../../../application/queries/FindSongById.handler';
import { ApiProperty } from '@nestjs/swagger';

class FindSongByIdDTOResponse extends FindSongResult {
  @ApiProperty({ example: 'Verano azul' })
  readonly title: string;
  @ApiProperty({ example: 'Una luna llena de estrellas' })
  readonly description: string;
  @ApiProperty({ example: 2 })
  readonly version: number;
}

export default FindSongByIdDTOResponse;
