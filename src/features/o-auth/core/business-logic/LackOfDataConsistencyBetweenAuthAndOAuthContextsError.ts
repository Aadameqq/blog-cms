export class LackOfDataConsistencyBetweenAuthAndOAuthContextsError extends Error {
  public constructor(id: string) {
    super(
      `Lack of data consistency between auth and o-auth contexts for id: ${id}`,
    );
  }
}
