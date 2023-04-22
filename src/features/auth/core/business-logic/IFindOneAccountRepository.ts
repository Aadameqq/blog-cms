import { Account } from './Account';

export interface IFindOneAccountRepository {
  findOne(accountId: string): Promise<Account | false>;
}
