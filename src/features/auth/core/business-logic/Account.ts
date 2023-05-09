export class Account {
  public constructor(
    public readonly id: string,
    public readonly permissions: string[] = [],
  ) {}
}
