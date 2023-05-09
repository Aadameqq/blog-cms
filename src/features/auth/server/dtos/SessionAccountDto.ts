export class SessionAccountDto {
  public constructor(
    public readonly id: string,
    public readonly permissions: string,
  ) {}
}
