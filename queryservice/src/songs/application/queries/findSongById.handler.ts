import { Inject } from '@nestjs/common';
import { IQueryHandler, IQueryResult, QueryHandler } from '@nestjs/cqrs';
import { ISongRepository, InjectionToken } from '../../domain';
import { FindSongByIdQuery } from './FindSongById.query';

export class FindSongResult implements IQueryResult {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly version: number,
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
    const { title, description, version } = await this.songRepository.findById(
      query.id,
    );
    // ...
    return new FindSongResult(title, description, version);
  }
}
