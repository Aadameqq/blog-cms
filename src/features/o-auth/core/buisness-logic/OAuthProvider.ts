export class OAuthProvider {
  public constructor(
    public readonly clientId: string,

    public readonly clientSecret: string,

    public readonly redirectUri: string,
  ) {}
}
