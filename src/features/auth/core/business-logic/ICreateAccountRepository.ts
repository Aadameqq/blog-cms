import { Account } from './Account';

export interface ICreateAccountRepository {
  create(account: Account): Promise<Account>;
}
