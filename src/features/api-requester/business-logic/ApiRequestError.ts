export class ApiRequestError extends Error {
  public constructor(
    apiErrorMessage: string,
    public readonly statusCode: number,
  ) {
    super(apiErrorMessage);
  }
}
