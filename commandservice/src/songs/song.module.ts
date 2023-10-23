import { Logger, Module } from '@nestjs/common';
import { SongController } from './infraestructure/http/song.controller';
import { SongRepository } from './infraestructure/mongodb/song.repository';
import RabbitMQ from './infraestructure/rabbitmq/rabbimq.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './infraestructure/mongodb/model/song.model';
import { CreateSongHandler } from '../songs/application/commands/create.song/CreateSong.handler';
import { CqrsModule } from '@nestjs/cqrs';

const handlers = [CreateSongHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]),
  ],

  controllers: [SongController],
  providers: [
    ...handlers,
    Logger,
    {
      provide: 'ISongRepository',
      useClass: SongRepository,
    },
    {
      provide: 'IEventBus',
      useClass: RabbitMQ,
    },
  ],
  exports: [],
})
export class SongModule {}
