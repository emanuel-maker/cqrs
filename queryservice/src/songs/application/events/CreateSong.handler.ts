import { Inject, Injectable, Logger } from '@nestjs/common';
import { ISong, ISongRepository, InjectionToken } from 'src/songs/domain';
import { ICreateSongEvent } from './CreateSong.event';

@Injectable()
class CreateSongEventHandler implements ICreateSongEvent {
  constructor(
    @Inject(InjectionToken.ISongRepository)
    private readonly songRepository: ISongRepository,
    private readonly logger: Logger,
  ) {}
  async execute(song: ISong) {
    this.logger.log(`Updating query db service ${song}`);
    await this.songRepository.persist(song);
  }
}

export default CreateSongEventHandler;
