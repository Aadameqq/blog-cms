import { IApiRequester } from '@api-requester';
import { IOAuthProviderApiProxyFactory } from '../business-logic/IOAuthProviderApiProxyFactory';
import { OAuthProviderApiProxy } from '../business-logic/OAuthProviderApiProxy';
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
