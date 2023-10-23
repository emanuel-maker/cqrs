import { Test, TestingModule } from '@nestjs/testing';
import { SongController } from './song.controller';
import { CommandBus } from '@nestjs/cqrs';
import { CreateSongCommand } from '../../application/commands/create.song/CreateSong.command';
import { CreateSongDto } from './dto/CreateSong.dto.request';
import {
  SongAuthorId,
  SongDescription,
  SongTittle,
  SongVersion,
} from '../../domain/song';

describe('Song Controller Suite', () => {
  let controller: SongController;
  let commandBus: CommandBus;

  const commandBusMock = {
    execute: jest.fn(() => true),
  };

  const song: CreateSongDto = {
    title: 'Hello',
    authorId: 'Mis maravillas',
    description: 'Una lectura amable',
    version: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongController],
      providers: [
        {
          provide: CommandBus,
          useValue: commandBusMock,
        },
      ],
    }).compile();

    controller = module.get<SongController>(SongController);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('Controller should be defined', () => {
    // to be defined
    expect(controller).toBeDefined();
  });

  it('Should be calling command bus one time', async () => {
    // ensure the command bus is executed
    await controller.create(song);
    expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
  });

  it('Should be calling command bus with DTO no refactored', async () => {
    // ensure that controller don't modify the payload
    await controller.create(song);

    const songTittle = new SongTittle(song.title);
    const songAuthorId = new SongAuthorId(song.authorId);
    const songDescription = new SongDescription(song.description);
    const songVersion = new SongVersion(song.version);

    expect(commandBusMock.execute).toHaveBeenCalledWith(
      new CreateSongCommand(
        songTittle,
        songAuthorId,
        songDescription,
        songVersion,
      ),
    );
  });
});
