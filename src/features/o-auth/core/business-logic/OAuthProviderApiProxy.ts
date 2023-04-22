import { IApiRequester } from '@api-requester';
import { OAuthProvider } from './OAuthProvider';
import { OAuthApiUserDataDto } from './OAuthApiUserDataDto';

export abstract class OAuthProviderApiProxy {
  protected abstract provider: OAuthProvider;

  public constructor(protected apiRequester: IApiRequester) {}

  public static inject = ['apiRequester'] as const;

  public abstract getAccessToken(code: string): Promise<string>;

  public abstract getUserData(
    accessToken: string,
  ): Promise<OAuthApiUserDataDto>;
}
