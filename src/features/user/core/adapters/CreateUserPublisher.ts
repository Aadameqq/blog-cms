import { INotifyCreateUserPublisher } from '@user/core/business-logic/INotifyCreateUserPublisher';
import { ISubscribeCreateUserPublisher } from '@user/core/business-logic/ISubscribeCreateUserPublisher';
import { ICreateUserSubscriber } from '@user/core/business-logic/ICreateUserSubscriber';
import { CreateUserEventDto } from '@user/core/business-logic/CreateUserEventDto';

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
