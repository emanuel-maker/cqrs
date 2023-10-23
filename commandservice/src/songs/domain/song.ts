import { AggregateRoot } from '@nestjs/cqrs';
// valueObject
export class SongTittle {
  constructor(readonly value: string) {}
}
// valueObject
export class SongAuthorId {
  constructor(readonly value: string) {}
}

interface ISong {
  title: SongTittle;
  authorId: SongAuthorId;
  description: SongDescription;
  version: SongVersion;
}

// valueObject
export class SongDescription {
  unauthorizedWords: string[] = ['sex', 'xxx', 'porn'];

  constructor(readonly value: string) {
    this.checkUnauthorizedWords();
  }

  checkUnauthorizedWords() {
    for (const word of this.unauthorizedWords) {
      if (this.value.includes(word)) {
        throw new Error(
          `No authorized words in description ${this.unauthorizedWords}`,
        );
      }
    }
  }
}

// valueObject
export class SongVersion {
  constructor(readonly value: number) {}
}

export class Song extends AggregateRoot implements ISong {
  // events []
  constructor(
    readonly title: SongTittle, // valueObject
    readonly authorId: SongAuthorId, // valueObject
    readonly description: SongDescription, // valueObject
    readonly version: SongVersion, // valueObject
  ) {
    super();
  }

  static create(
    title: SongTittle,
    authorId: SongAuthorId,
    description: SongDescription,
    version: SongVersion,
  ): Song {
    const song = new Song(title, authorId, description, version);
    song.apply(
      new SongCreatedEvent(
        title.value,
        authorId.value,
        description.value,
        version.value,
      ),
    );
    return song;
  }
}

export class SongCreatedEvent {
  constructor(
    public readonly title: string,
    public readonly authorId: string,
    readonly description: string,
    readonly version: number,
  ) {}
}

export default ISong;
