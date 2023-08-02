import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  authorId: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  version: number;
}
