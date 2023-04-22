import { createInjector } from 'typed-inject';
import { SessionCredentialsProvider } from './adapters/SessionCredentialsProvider';
import { SetSessionAuthData } from './adapters/SetSessionAuthData';
import { PrismaAccountRepository } from './adapters/PrismaAccountRepository';

export * from './business-logic/ICredentialsProvider';
export * from './adapters/SetSessionAuthData';
export * from './business-logic/ICreateAccountRepository';
export * from './business-logic/Account';
export * from './business-logic/IFindOneAccountRepository';

export const getSessionCredentialsProvider = (
  setAuthData: SetSessionAuthData,
) =>
  createInjector()
    .provideValue('setSessionAuthData', setAuthData)
    .injectClass(SessionCredentialsProvider);

export const getPrismaAccountRepository = () =>
  createInjector().injectClass(PrismaAccountRepository);
