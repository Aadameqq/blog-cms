import { Account } from '@auth/core/business-logic/Account';

export interface ICreateAccountRepository {
  create(account: Account): Promise<Account>;
}
