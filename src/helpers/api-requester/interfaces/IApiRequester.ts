import { ApiRequest } from '../business-logic/ApiRequest';

export interface IApiRequester {
  requestApi<ResponseType>(req: ApiRequest): Promise<ResponseType>;
}
