import { Module } from '@nestjs/common';
import { SongModule } from './songs/song.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SongModule,
    MongooseModule.forRoot('mongodb://localhost:27017/commandb'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
