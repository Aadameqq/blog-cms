import { Account } from '@auth/core/business-logic/Account';

export interface IFindOneAccountRepository {
  findOne(accountId: string): Promise<Account | false>;
}
