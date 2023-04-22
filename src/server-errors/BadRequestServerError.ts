import { ServerError } from './ServerError';

export class BadRequestServerError extends ServerError {
  private static defaultMessage = 'TODO: add default error msg';

  public constructor(msg?: string) {
    super(msg || BadRequestServerError.defaultMessage);
  }

  public getStatusCode(): number {
    return 400;
  }
}
