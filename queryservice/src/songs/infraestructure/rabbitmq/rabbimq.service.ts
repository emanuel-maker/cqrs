import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import client, { Channel, Connection } from 'amqplib';
import { Logger } from '@nestjs/common';
import { InjectionToken } from '../../domain';
import { ICreateSongEvent } from 'src/songs/application/events/CreateSong.event';

@Injectable()
class RabbitMQ implements OnModuleInit {
  private connection: Connection;
  private channel: Channel;
  private queue = 'create.song.queue';
  private exchangeName = 'song.exchange';
  private exchangeType = 'direct';
  constructor(
    private readonly logger: Logger,
    @Inject(InjectionToken.ICreateSongEvent)
    private readonly createSongEvent: ICreateSongEvent,
  ) {}

  onModuleInit() {
    this.init();
  }

  public async init() {
    this.connection = await client.connect('amqp://guest:guest@localhost:5672');
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange(this.exchangeName, this.exchangeType);
    await this.consumerHandler();
  }
  async consumerHandler() {
    this.logger.log('🚀 ~ Rabbitmq: Configured');
    await this.channel.assertQueue(this.queue, {
      durable: true,
    });

    await this.channel.bindQueue(this.queue, this.exchangeName, 'create.song');
    this.channel.consume(this.queue, async (message) => {
      const content = message.content.toString();
      this.logger.log(
        `🚀 ~ Rabbitmq: Received messages from ${this.queue} is`,
        JSON.parse(content),
      );

      await this.createSongEvent.execute(JSON.parse(content));

      this.channel.ack(message);
    });
  }
}

export default RabbitMQ;
