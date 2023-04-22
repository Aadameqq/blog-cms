import { CreateUserEventDto } from '@user/core/business-logic/CreateUserEventDto';

export interface ICreateUserSubscriber {
  update(user: CreateUserEventDto): void;
}
