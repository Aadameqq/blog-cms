import { ISubscribeUserCreatedEventPublisher } from '../business-logic/ISubscribeUserCreatedEventPublisher';
import { IPublishUserCreatedEventPublisher } from '../business-logic/IPublishUserCreatedEventPublisher';
import { IUserCreatedEventListener } from '../business-logic/IUserCreatedEventListener';
import { UserCreatedEventDto } from '../business-logic/UserCreatedEventDto';

export class UserCreatedEventPublisher
  implements
    IPublishUserCreatedEventPublisher,
    ISubscribeUserCreatedEventPublisher
{
  private subscribers: IUserCreatedEventListener[];

  public subscribe(subscriber: IUserCreatedEventListener) {
    this.subscribers.push(subscriber);
  }

  public publish(obj: UserCreatedEventDto): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.update(obj);
    });
  }
}
