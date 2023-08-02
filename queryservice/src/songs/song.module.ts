import { Logger, Module } from '@nestjs/common';
import { SongController } from './infraestructure/http/song.controller';
import { SongRepository } from './infraestructure/mongodb/song.repository';
import RabbitMQ from './infraestructure/rabbitmq/rabbimq.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './infraestructure/mongodb/model/song.model';
import { CqrsModule } from '@nestjs/cqrs';
import { FindSongByIdHandler } from './application/queries/FindSongById.handler';
import CreateSongEventHandler from './application/events/CreateSong.handler';

const handlers = [FindSongByIdHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]),
  ],

  controllers: [SongController],
  providers: [
    ...handlers,
    RabbitMQ,
    Logger,
    {
      provide: 'ISongRepository',
      useClass: SongRepository,
    },
    {
      provide: 'ICreateSongEvent',
      useClass: CreateSongEventHandler,
    },
  ],
  exports: [],
})
export class SongModule {}
