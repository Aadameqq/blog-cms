import { UserCreatedEventDto } from '../business-logic/UserCreatedEventDto';

export interface IUserCreatedEventListener {
  update(eventDto: UserCreatedEventDto): void;
}
