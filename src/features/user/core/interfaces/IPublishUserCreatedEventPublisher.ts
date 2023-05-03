import { UserCreatedEventDto } from '../business-logic/UserCreatedEventDto';

export interface IPublishUserCreatedEventPublisher {
  publish(eventDto: UserCreatedEventDto): void;
}
