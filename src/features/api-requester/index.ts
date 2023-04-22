import { createInjector } from 'typed-inject';

export * from './business-logic/IApiRequester';
export * from './business-logic/ApiMethods';
export * from './business-logic/ApiRequest';
export * from './business-logic/ApiRequestError';
import { AxiosApiRequester } from './adapters/AxiosApiRequester';

export const getAxiosApiRequester = () =>
  createInjector().injectClass(AxiosApiRequester);
