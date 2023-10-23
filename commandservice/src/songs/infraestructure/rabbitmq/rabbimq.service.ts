import { Injectable } from '@nestjs/common';
import client, { Channel, Connection } from 'amqplib';
import IEventBus from 'src/songs/domain/song.eventbus';
import { Logger } from '@nestjs/common';
import { IEvent } from '@nestjs/cqrs';
import { SongCreatedEvent } from '../../domain/song';

export enum EventBusMessages {
  createSong = 'create.song',
}

@Injectable()
class RabbitMQ implements IEventBus {
  private connection: Connection;
  private channel: Channel;
  private exchangeName = 'song.exchange';
  private exchangeType = 'direct';
  constructor(private readonly logger: Logger) {
    this.init();
  }
  public async init() {
    this.connection = await client.connect('amqp://guest:guest@localhost:5672');
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange(this.exchangeName, this.exchangeType);
  }
  async publish(events: IEvent[]): Promise<void> {
    console.log(
      '🚀 ~ file: rabbimq.service.ts:23 ~ RabbitMQ ~ publish ~ _events:',
      events,
    );

    for (const event of events) {
      if (event instanceof SongCreatedEvent) {
        const sent = await this.channel.publish(
          this.exchangeName,
          EventBusMessages.createSong,
          Buffer.from(JSON.stringify(event)),
          {
            persistent: true,
          },
        );
        if (sent) {
          this.logger.log(` 🚀 ~ Rabbitmq: Message sent`);
        }
      }
    }
  }
}

export default RabbitMQ;
