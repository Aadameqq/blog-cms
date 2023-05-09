import { IApiRequester } from '@helpers/api-requester';
import { OAuthProvider } from '../business-logic/OAuthProvider';
import { OAuthApiUserDataDto } from '../business-logic/OAuthApiUserDataDto';

export abstract class OAuthProviderApiProxy {
  protected abstract provider: OAuthProvider;

  public constructor(protected apiRequester: IApiRequester) {}

  public static inject = ['apiRequester'] as const;

  public abstract getAccessToken(code: string): Promise<string>;

  public abstract getUserData(
    accessToken: string,
  ): Promise<OAuthApiUserDataDto>;
}
