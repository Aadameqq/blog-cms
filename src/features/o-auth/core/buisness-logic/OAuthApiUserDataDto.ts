export class OAuthApiUserDataDto {
  public constructor(
    public readonly oAuthId: string,
    public readonly username: string,
    public readonly avatarURL: string,
  ) {}
}
