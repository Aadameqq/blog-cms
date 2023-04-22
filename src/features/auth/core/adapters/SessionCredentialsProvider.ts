import { ICredentialsProvider } from '@auth/core';
import { SetSessionAuthData } from '@auth/core/adapters/SetSessionAuthData';
import { Account } from '../business-logic/Account';

export class SessionCredentialsProvider implements ICredentialsProvider {
  public constructor(private setSessionAuthData: SetSessionAuthData) {}

  public static inject = ['setSessionAuthData'] as const;

  public provide(account: Account): void {
    this.setSessionAuthData(account.id, account.permissions);
  }
}
