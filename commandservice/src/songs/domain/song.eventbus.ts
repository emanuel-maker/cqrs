import { IEvent } from '@nestjs/cqrs';

interface IEventBus {
  publish(events: IEvent[]): Promise<void>;
}

export default IEventBus;
