import { Inject } from '@nestjs/common';
import { IQueryHandler, IQueryResult, QueryHandler } from '@nestjs/cqrs';
import { ISongRepository, InjectionToken } from 'src/songs/domain';
import { FindSongByIdQuery } from 'src/songs/application/queries/FindSongById.query';

export class FindSongResult implements IQueryResult {
  constructor(
    readonly song: Readonly<{
      title: string;
      description: string;
      version: number;
    }>,
  ) {}
}

@QueryHandler(FindSongByIdQuery)
export class FindSongByIdHandler
  implements IQueryHandler<FindSongByIdQuery, FindSongResult>
{
  constructor(
    @Inject(InjectionToken.ISongRepository)
    private readonly songRepository: ISongRepository,
  ) {}

  async execute(query: FindSongByIdQuery): Promise<FindSongResult> {
    const song = await this.songRepository.findById(query.id);
    return new FindSongResult(song);
  }
}
