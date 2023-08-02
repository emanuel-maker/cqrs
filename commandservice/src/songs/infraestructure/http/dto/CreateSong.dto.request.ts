import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Verano azul' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Michael Castro' })
  authorId: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'En la luna todo ira mejor' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 3 })
  version: number;
}
