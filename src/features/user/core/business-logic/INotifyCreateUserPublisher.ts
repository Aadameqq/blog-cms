import { CreateUserEventDto } from '@user/core/business-logic/CreateUserEventDto';

export interface INotifyCreateUserPublisher {
  notify(user: CreateUserEventDto): void;
}
