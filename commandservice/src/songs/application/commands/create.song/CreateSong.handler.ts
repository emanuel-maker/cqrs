import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IEventBus, ISongRepository, Song } from '../../../domain';
import { InjectionToken } from '../../injection.token';
import { CreateSongCommand } from './CreateSong.command';

@CommandHandler(CreateSongCommand)
export class CreateSongHandler implements ICommandHandler<CreateSongCommand> {
  constructor(
    @Inject(InjectionToken.ISongRepository)
    private readonly songRepository: ISongRepository,
    private readonly logger: Logger,
    @Inject(InjectionToken.IEventBus) private readonly eventBus: IEventBus,
  ) {}
  async execute(command: CreateSongCommand) {
    // bussines logic
    // si entre diferentes servicios de aplicación tenemos logica repetida, check o logic interna del dominio, podemos separar esa pequeña parte y crear un nuevo servicio de dominio
    const { songTittle, songAuthorId, songDescription, songVersion } = command;
    const song = Song.create(
      songTittle,
      songAuthorId,
      songDescription,
      songVersion,
    );
    await this.songRepository.persist(song);
    await this.eventBus.publish(song.getUncommittedEvents());
    this.logger.log('Executed method in command service');
  }
}
