import { Account } from '../business-logic/Account';

export interface ICreateAccountRepository {
  create(account: Account): Promise<Account>;
}
