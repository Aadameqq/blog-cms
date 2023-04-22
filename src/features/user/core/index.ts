import { createInjector } from 'typed-inject';

export * from './business-logic/CreateUserEventDto';
export * from './business-logic/ICreateUserSubscriber';
export * from './business-logic/INotifyCreateUserPublisher';
export * from './business-logic/ISubscribeCreateUserPublisher';

import { CreateUserPublisher } from '@user/core/adapters/CreateUserPublisher';

export const getCreateUserPublisher = () =>
  createInjector().injectClass(CreateUserPublisher);
