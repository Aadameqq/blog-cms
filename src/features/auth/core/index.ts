import { createInjector } from 'typed-inject';
import { SessionCredentialsProvider } from './implementations/SessionCredentialsProvider';
import { SetSessionAuthData } from './implementations/SetSessionAuthData';
import { PrismaAccountRepository } from './implementations/PrismaAccountRepository';
import { ICreateAccountRepository } from './interfaces/ICreateAccountRepository';
import { IFindOneAccountRepository } from './interfaces/IFindOneAccountRepository';

export * from './interfaces/ICredentialsProvider';
export * from './implementations/SetSessionAuthData';
export * from './interfaces/ICreateAccountRepository';
export * from './business-logic/Account';
export * from './interfaces/IFindOneAccountRepository';

export const getSessionCredentialsProvider = (
  setAuthData: SetSessionAuthData,
) =>
  createInjector()
    .provideValue('setSessionAuthData', setAuthData)
    .injectClass(SessionCredentialsProvider);

export const createAccountRepository = (): ICreateAccountRepository &
  IFindOneAccountRepository =>
  createInjector().injectClass(PrismaAccountRepository);
