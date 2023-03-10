import { ServerError } from './ServerError';

export class BadRequestServerError extends ServerError {
  private static defaultMessage = 'TODO: add default error msg';

  constructor(msg?: string) {
    super(msg || BadRequestServerError.defaultMessage);
  }

  getStatusCode(): number {
    return 400;
  }
}
