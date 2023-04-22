import { UserCreatedEventDto } from './UserCreatedEventDto';

export interface IUserCreatedEventListener {
  update(eventDto: UserCreatedEventDto): void;
}
