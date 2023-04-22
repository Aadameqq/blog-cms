import { Account } from './Account';

export interface ICredentialsProvider {
  provide(account: Account): void;
}
