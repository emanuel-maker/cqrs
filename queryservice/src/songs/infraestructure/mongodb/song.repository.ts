import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import ISongRepository from '../../domain/song.repository';
import { Song, SongDocument } from './model/song.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISong } from '../../domain';

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

  async findById(id: string) {
    const document = await this.songModel.findById(id).exec();
    console.log(
      '🚀 ~ file: song.repository.ts:23 ~ SongRepository ~ findById ~ document:',
      document,
    );
    if (!document) {
      throw new NotFoundException('Documento no encontrado');
    }
    return document;
  }
}
