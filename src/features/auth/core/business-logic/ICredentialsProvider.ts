import { Account } from '@auth/core/business-logic/Account';

export interface ICredentialsProvider {
  provide(account: Account): void;
}
