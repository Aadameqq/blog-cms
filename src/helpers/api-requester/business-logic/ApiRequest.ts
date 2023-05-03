import { ApiMethods } from '../interfaces/ApiMethods';

export class ApiRequest {
  public constructor(
    public readonly method: ApiMethods,
    public readonly url: URL,
    public readonly body?: unknown,
    public readonly authHeader?: string,
  ) {}
}
