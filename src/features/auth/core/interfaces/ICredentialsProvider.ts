import { Account } from '../business-logic/Account';

export interface ICredentialsProvider {
  provide(account: Account): void;
}
