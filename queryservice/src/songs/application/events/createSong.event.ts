import { Inject, Injectable, Logger } from '@nestjs/common';
import { ISong, ISongRepository, InjectionToken } from 'src/songs/domain';
import { ICreateSongEvent } from 'src/songs/domain/events/createSong.event';

@Injectable()
class CreateSongEvent implements ICreateSongEvent {
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

export default CreateSongEvent;
