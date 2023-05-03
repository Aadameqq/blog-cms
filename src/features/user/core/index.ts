import { createInjector } from 'typed-inject';
import { UserCreatedEventPublisher } from './implementations/UserCreatedEventPublisher';
import { ISubscribeUserCreatedEventPublisher } from './interfaces/ISubscribeUserCreatedEventPublisher';
import { IPublishUserCreatedEventPublisher } from './interfaces/IPublishUserCreatedEventPublisher';

export * from './business-logic/UserCreatedEventDto';
export * from './interfaces/IUserCreatedEventListener';
export * from './interfaces/IPublishUserCreatedEventPublisher';
export * from './interfaces/ISubscribeUserCreatedEventPublisher';

export const createUserCreatedEventPublisher =
  (): ISubscribeUserCreatedEventPublisher & IPublishUserCreatedEventPublisher =>
    createInjector().injectClass(UserCreatedEventPublisher);
