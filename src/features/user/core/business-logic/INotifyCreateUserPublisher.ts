import { CreateUserEventDto } from './CreateUserEventDto';

export interface INotifyCreateUserPublisher {
  notify(user: CreateUserEventDto): void;
}
