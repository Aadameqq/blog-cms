import { UserCreatedEventDto } from './UserCreatedEventDto';

export interface IPublishUserCreatedEventPublisher {
  publish(eventDto: UserCreatedEventDto): void;
}
