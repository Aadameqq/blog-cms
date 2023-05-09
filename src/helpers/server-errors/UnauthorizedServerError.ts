import { ServerError } from './ServerError';

export class UnauthorizedServerError extends ServerError {
  private static defaultMessage = 'TODO: add default error msg';

  public constructor(msg?: string) {
    super(msg || UnauthorizedServerError.defaultMessage);
  }

  public getStatusCode(): number {
    return 401;
  }
}
