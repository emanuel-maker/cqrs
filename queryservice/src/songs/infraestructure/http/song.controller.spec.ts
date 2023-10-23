import { Test, TestingModule } from '@nestjs/testing';
import { SongController } from './song.controller';
import { QueryBus } from '@nestjs/cqrs';

describe('Query controller suite', () => {
  let controller: SongController;
  let queryBus: QueryBus;

  const mockQueryBus = {
    execute: jest.fn(() => true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongController],
      providers: [
        {
          provide: QueryBus,
          useValue: mockQueryBus,
        },
      ],
    }).compile();

    controller = module.get<SongController>(SongController);
    queryBus = module.get<QueryBus>(QueryBus);
  });
  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  // TODO: refactor and finish this topic test

  it('Query bus should be called', async () => {
    await controller.getById('example'); // must be called 1 time
    expect(queryBus.execute).toHaveBeenCalledTimes(1);
  });
});
