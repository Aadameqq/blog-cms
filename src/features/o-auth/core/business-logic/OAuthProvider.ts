import { ApiMethods } from '@api-requester';

type OAuthProviderEndpoint = {
  url: URL;
  method: ApiMethods;
};

export class OAuthProvider {
  public constructor(
    public readonly clientId: string,

    public readonly clientSecret: string,

    public readonly redirectUri: string,

    public readonly accessTokenEndpoint: OAuthProviderEndpoint,

    public readonly userDataEndpoint: OAuthProviderEndpoint,
  ) {}
}
