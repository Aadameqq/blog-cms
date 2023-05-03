import { Account } from '../business-logic/Account';

export interface IFindOneAccountRepository {
  findOne(accountId: string): Promise<Account | false>;
}
