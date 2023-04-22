import { createInjector } from 'typed-inject';
import { CreateUserPublisher } from './adapters/CreateUserPublisher';

export * from './business-logic/CreateUserEventDto';
export * from './business-logic/ICreateUserSubscriber';
export * from './business-logic/INotifyCreateUserPublisher';
export * from './business-logic/ISubscribeCreateUserPublisher';

export const getCreateUserPublisher = () =>
  createInjector().injectClass(CreateUserPublisher);
