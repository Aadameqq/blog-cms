import { createInjector } from 'typed-inject';
import { UserCreatedEventPublisher } from './adapters/UserCreatedEventPublisher';

export * from './business-logic/UserCreatedEventDto';
export * from './business-logic/IUserCreatedEventListener';
export * from './business-logic/IPublishUserCreatedEventPublisher';
export * from './business-logic/ISubscribeUserCreatedEventPublisher';

export const getUserCreatedEventPublisher = () =>
  createInjector().injectClass(UserCreatedEventPublisher);
