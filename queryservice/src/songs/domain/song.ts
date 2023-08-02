import { AggregateRoot } from '@nestjs/cqrs';
interface ISong {
  title: string;
  authorId: string;
  description: string;
  version: number;
}

export class Song extends AggregateRoot implements ISong {
  description: string;
  version: number;
  title: string;
  authorId: string;
}

export default ISong;
