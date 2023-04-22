import { createInjector } from 'typed-inject';
import { AxiosApiRequester } from './adapters/AxiosApiRequester';

export * from './business-logic/IApiRequester';
export * from './business-logic/ApiMethods';
export * from './business-logic/ApiRequest';
export * from './business-logic/ApiRequestError';

export const getAxiosApiRequester = () =>
  createInjector().injectClass(AxiosApiRequester);
