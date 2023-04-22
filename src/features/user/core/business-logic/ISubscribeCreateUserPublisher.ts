import { ICreateUserSubscriber } from '@user/core/business-logic/ICreateUserSubscriber';

export interface ISubscribeCreateUserPublisher {
  subscribe(subscriber: ICreateUserSubscriber): void;
}
