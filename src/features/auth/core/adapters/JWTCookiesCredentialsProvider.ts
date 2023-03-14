import { ICredentialsProvider } from '@auth';
import { Account } from '@account';

export type SetCookie = (name: string, value: string) => void;
export class JWTCookiesCredentialsProvider implements ICredentialsProvider {
  public constructor(private setCookie: SetCookie) {}

  public provide(account: Account): void {}
}
