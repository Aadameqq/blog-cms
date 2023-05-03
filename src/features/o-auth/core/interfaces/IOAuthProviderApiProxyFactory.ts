import { OAuthProviderApiProxy } from './OAuthProviderApiProxy';

export interface IOAuthProviderApiProxyFactory {
  create(providerType: string): OAuthProviderApiProxy;
}
