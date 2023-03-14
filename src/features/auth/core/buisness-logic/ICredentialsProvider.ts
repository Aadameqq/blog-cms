import { Account } from '@account';

export interface ICredentialsProvider {
  provide(account: Account): void;
}
