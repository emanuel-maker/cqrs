import { IEvent } from '@nestjs/cqrs';

export class SongCreatedEvent implements IEvent {
  constructor(readonly title: string) {}
}
