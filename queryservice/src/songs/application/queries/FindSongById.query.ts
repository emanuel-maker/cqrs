import { IQuery } from '@nestjs/cqrs';

export class FindSongByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
