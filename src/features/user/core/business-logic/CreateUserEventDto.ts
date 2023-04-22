export class CreateUserEventDto {
  public constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly avatarUrl: string,
  ) {}
}
