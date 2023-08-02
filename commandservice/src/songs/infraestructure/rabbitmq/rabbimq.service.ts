import { Injectable } from '@nestjs/common';
import client, { Channel, Connection } from 'amqplib';
import IEventBus from 'src/songs/domain/song.eventbus';
import { Logger } from '@nestjs/common';

@Injectable()
class RabbitMQ implements IEventBus {
  private connection: Connection;
  private channel: Channel;
  private queue = 'create.song.queue';
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
  async publish(routeKey: string, message: any): Promise<void> {
    const sent = await this.channel.publish(
      this.exchangeName,
      routeKey,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      },
    );
    if (sent) {
      this.logger.log(` 🚀 ~ Rabbitmq: Message sent`);
    }
  }
}

export default RabbitMQ;
