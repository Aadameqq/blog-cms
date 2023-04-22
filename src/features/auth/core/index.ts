import { createInjector } from 'typed-inject';

export * from './business-logic/ICredentialsProvider';
export * from './adapters/SetSessionAuthData';
import { SetSessionAuthData } from '@auth/core/adapters/SetSessionAuthData';
import { PrismaAccountRepository } from '@auth/core/adapters/PrismaAccountRepository';
import { SessionCredentialsProvider } from './adapters/SessionCredentialsProvider';

export const getSessionCredentialsProvider = (
  setAuthData: SetSessionAuthData,
) =>
  createInjector()
    .provideValue('setSessionAuthData', setAuthData)
    .injectClass(SessionCredentialsProvider);

export const getPrismaAccountRepository = () =>
  createInjector().injectClass(PrismaAccountRepository);
