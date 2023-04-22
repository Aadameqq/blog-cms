import { ICreateUserSubscriber } from './ICreateUserSubscriber';

export interface ISubscribeCreateUserPublisher {
  subscribe(subscriber: ICreateUserSubscriber): void;
}
