import axios, { AxiosError, AxiosInstance } from 'axios';
import { ApiRequestError } from '../business-logic/ApiRequestError';
import { ApiRequest } from '../business-logic/ApiRequest';
import { IApiRequester } from '../business-logic/IApiRequester';

export class AxiosApiRequester implements IApiRequester {
  private instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create({});
  }

  public async requestApi<ResponseType>(req: ApiRequest) {
    try {
      const res = await axios<ResponseType>({
        method: req.method,
        data: req.body,
        url: req.url.toString(),
        headers: {
          Authorization: req.authHeader,
        },
      });
      return res.data;
    } catch (err) {
      if (!(err instanceof AxiosError)) throw err;
      if (!err.response) throw err;

      throw new ApiRequestError(err.response.data, err.response.status);
    }
  }
}
