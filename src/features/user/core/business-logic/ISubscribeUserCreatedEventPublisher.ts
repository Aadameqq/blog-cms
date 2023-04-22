import { IUserCreatedEventListener } from './IUserCreatedEventListener';

export interface ISubscribeUserCreatedEventPublisher {
  subscribe(listener: IUserCreatedEventListener): void;
}
