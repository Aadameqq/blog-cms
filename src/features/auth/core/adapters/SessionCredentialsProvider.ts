import { ICredentialsProvider } from '../business-logic/ICredentialsProvider';
import { Account } from '../business-logic/Account';
import { SetSessionAuthData } from './SetSessionAuthData';

export class SessionCredentialsProvider implements ICredentialsProvider {
  public constructor(private setSessionAuthData: SetSessionAuthData) {}

  public static inject = ['setSessionAuthData'] as const;

  public provide(account: Account): void {
    this.setSessionAuthData(account.id, account.permissions);
  }
}
