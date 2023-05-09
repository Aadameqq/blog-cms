import { createInjector } from 'typed-inject';
import { AxiosApiRequester } from './implementations/AxiosApiRequester';
import { IApiRequester } from './interfaces/IApiRequester';

export * from './interfaces/IApiRequester';
export * from './interfaces/ApiMethods';
export * from './business-logic/ApiRequest';
export * from './business-logic/ApiRequestError';

export const createApiRequester = (): IApiRequester =>
  createInjector().injectClass(AxiosApiRequester);
