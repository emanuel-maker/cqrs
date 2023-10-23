import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { InjectionToken } from '../../injection.token';
import { CreateSongHandler } from './CreateSong.handler';
import { CreateSongCommand } from './CreateSong.command';
import { CreateSongDto } from '../../../infraestructure/http/dto/CreateSong.dto.request';
import {
  Song,
  SongAuthorId,
  SongDescription,
  SongTittle,
  SongVersion,
} from '../../../domain/song';

describe('CreateSong Handler Suite', () => {
  let createSongHandler: CreateSongHandler;
  const mockRepository = {
    persist: jest.fn(() => true),
  };

  const mockEventBus = {
    publish: jest.fn(() => true),
  };

  const song: CreateSongDto = {
    title: 'Hello',
    authorId: 'Mis maravillas',
    description: 'Una lectura amable',
    version: 1,
  };

  const songTittle = new SongTittle(song.title);
  const songAuthorId = new SongAuthorId(song.authorId);
  const songDescription = new SongDescription(song.description);
  const songVersion = new SongVersion(song.version);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSongHandler,
        {
          provide: InjectionToken.ISongRepository,
          useValue: mockRepository,
        },
        {
          provide: InjectionToken.IEventBus,
          useValue: mockEventBus,
        },
        Logger,
      ],
    }).compile();

    createSongHandler = module.get<CreateSongHandler>(CreateSongHandler);
    jest.clearAllMocks();
  });

  it('Handler should be call persist', async () => {
    await createSongHandler.execute(
      new CreateSongCommand(
        songTittle,
        songAuthorId,
        songDescription,
        songVersion,
      ),
    );

    const songObject = Song.create(
      songTittle,
      songAuthorId,
      songDescription,
      songVersion,
    );
    expect(mockRepository.persist).toHaveBeenCalledWith(songObject);
  });

  it('Handler should be call only one persist method', async () => {
    await createSongHandler.execute(
      new CreateSongCommand(
        songTittle,
        songAuthorId,
        songDescription,
        songVersion,
      ),
    );
    expect(mockRepository.persist).toHaveBeenCalledTimes(1);
  });

  it('Handler should be call with song object', async () => {
    await createSongHandler.execute(
      new CreateSongCommand(
        songTittle,
        songAuthorId,
        songDescription,
        songVersion,
      ),
    );

    expect(mockEventBus.publish).toHaveBeenCalledTimes(1);
  });
});
