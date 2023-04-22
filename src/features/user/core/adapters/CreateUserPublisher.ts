import { ISubscribeCreateUserPublisher } from '../business-logic/ISubscribeCreateUserPublisher';
import { INotifyCreateUserPublisher } from '../business-logic/INotifyCreateUserPublisher';
import { ICreateUserSubscriber } from '../business-logic/ICreateUserSubscriber';
import { CreateUserEventDto } from '../business-logic/CreateUserEventDto';

export class CreateUserPublisher
  implements INotifyCreateUserPublisher, ISubscribeCreateUserPublisher
{
  private subscribers: ICreateUserSubscriber[];

  public subscribe(subscriber: ICreateUserSubscriber) {
    this.subscribers.push(subscriber);
  }

  public notify(obj: CreateUserEventDto): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.update(obj);
    });
  }
}
