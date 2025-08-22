import {
  ApiMethods,
  ApiRequestError,
  ApiRequest,
} from '@helpers/api-requester';
import { getConfigVariable } from '@helpers/other';
import { OAuthProvider } from '../business-logic/OAuthProvider';
import { OAuthApiUserDataDto } from '../business-logic/OAuthApiUserDataDto';
import { OAuthProviderApiProxy } from '../interfaces/OAuthProviderApiProxy';
import { IncorrectOAuthCodeError } from '../business-logic/IncorrectOAuthCodeError';

export class GithubOAuthProviderApiProxy extends OAuthProviderApiProxy {
  protected provider = new OAuthProvider(
    getConfigVariable('GITHUB_OAUTH_CLIENT_ID'),
    getConfigVariable('GITHUB_OAUTH_CLIENT_SECRET'),
    getConfigVariable('GITHUB_OAUTH_REDIRECT_URI'),
    {
      url: new URL('https://github.com/login/oauth/access_token'),
      method: ApiMethods.POST,
    },
    {
      url: new URL('https://api.github.com/user'),
      method: ApiMethods.GET,
    },
  );

  public async getAccessToken(code: string): Promise<string> {
    const req = new ApiRequest(
      this.provider.accessTokenEndpoint.method,
      this.provider.accessTokenEndpoint.url,
      {
        client_id: this.provider.clientId,
        client_secret: this.provider.clientSecret,
        code,
        redirect_uri: this.provider.redirectUri,
      },
    );

    try {
      const data = await this.apiRequester.requestApi<{ access_token: string }>(
        req,
      );
      return data.access_token;
    } catch (err) {
      if (!(err instanceof ApiRequestError)) throw err;
      throw new IncorrectOAuthCodeError();
    }
  }

  public async getUserData(accessToken: string): Promise<OAuthApiUserDataDto> {
    const req = new ApiRequest(
      this.provider.userDataEndpoint.method,
      this.provider.userDataEndpoint.url,
      undefined,
      `Bearer ${accessToken}`,
    );

    const data = await this.apiRequester.requestApi<{
      id: number;
      name: string;
      avatar_url: string;
    }>(req);

    return new OAuthApiUserDataDto(
      data.id.toString(),
      data.name,
      data.avatar_url,
    );
  }
}
