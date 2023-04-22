import { ApiRequest } from './ApiRequest';

export interface IApiRequester {
  requestApi<ResponseType>(req: ApiRequest): Promise<ResponseType>;
}
