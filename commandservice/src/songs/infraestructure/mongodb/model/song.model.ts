import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SongDocument = HydratedDocument<Song>;

@Schema()
export class Song {
  @Prop({
    required: true,
    index: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  authorId: string;

  @Prop({
    required: false,
  })
  description: string;

  @Prop({
    required: false,
  })
  version: number;
}
export const SongSchema = SchemaFactory.createForClass(Song);
