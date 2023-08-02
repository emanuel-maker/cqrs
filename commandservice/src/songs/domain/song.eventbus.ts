interface IEventBus {
  publish(routeKey: string, message: any): Promise<void>;
}
export enum EventBusMessages {
  createSong = 'create.song',
}

export default IEventBus;
