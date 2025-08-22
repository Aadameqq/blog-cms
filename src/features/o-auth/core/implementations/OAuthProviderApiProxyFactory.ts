import { IApiRequester } from '@helpers/api-requester';
import { IOAuthProviderApiProxyFactory } from '../interfaces/IOAuthProviderApiProxyFactory';
import { OAuthProviderApiProxy } from '../interfaces/OAuthProviderApiProxy';
import { GithubOAuthProviderApiProxy } from './GithubOAuthProviderApiProxy';
import { UnknownOAuthProviderError } from '../business-logic/UnknownOAuthProviderError';

export class OAuthProviderApiProxyFactory
  implements IOAuthProviderApiProxyFactory
{
  public constructor(private apiRequester: IApiRequester) {}

  public static inject = ['apiRequester'] as const;

  public create(providerType: string): OAuthProviderApiProxy {
    switch (providerType) {
      case 'github':
        return new GithubOAuthProviderApiProxy(this.apiRequester);
      default:
        throw new UnknownOAuthProviderError();
    }
  }
}
