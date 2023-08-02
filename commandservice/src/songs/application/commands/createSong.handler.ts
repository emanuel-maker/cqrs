import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusMessages, IEventBus, ISongRepository } from '../../domain';
import { InjectionToken } from '../injection.token';
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
    this.logger.log('Execute method in command service');
    const { song } = command;
    await this.songRepository.persist(song);
    this.eventBus.publish(EventBusMessages.createSong, song);
  }
}
