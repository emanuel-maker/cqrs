import { Injectable, Logger } from '@nestjs/common';
import ISongRepository from 'src/songs/domain/song.repository';
import { Song, SongDocument } from './model/song.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISong } from 'src/songs/domain';

@Injectable()
export class SongRepository implements ISongRepository {
  constructor(
    private readonly logger: Logger,
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
  ) {}
  async persist(song: ISong): Promise<void> {
    await this.songModel.create({
      ...song,
    });
    return;
  }
}
