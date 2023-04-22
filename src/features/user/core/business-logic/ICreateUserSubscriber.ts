import { CreateUserEventDto } from './CreateUserEventDto';

export interface ICreateUserSubscriber {
  update(user: CreateUserEventDto): void;
}
