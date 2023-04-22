import { createInjector } from 'typed-inject';
import { getAxiosApiRequester } from '@helpers/api-requester';
import {
  getPrismaAccountRepository,
  getSessionCredentialsProvider,
  SetSessionAuthData,
} from '@auth/core';
import { getUuidv4IdGenerator } from '@helpers/id-generator';
import { getUserCreatedEventPublisher } from '@user/core';
import { PrismaOAuthDataRepository } from './adapters/PrismaOAuthDataRepository';
import { OAuthProviderApiProxyFactory } from './adapters/OAuthProviderApiProxyFactory';
import { OAuthService } from './business-logic/OAuthService';

export * from './business-logic/IOAuthService';

export const getOAuthService = (setSessionAuthData: SetSessionAuthData) =>
  createInjector()
    .provideClass('oAuthDataRepository', PrismaOAuthDataRepository)
    .provideValue('apiRequester', getAxiosApiRequester())
    .provideClass('providerApiProxyFactory', OAuthProviderApiProxyFactory)
    .provideValue(
      'credentialsProvider',
      getSessionCredentialsProvider(setSessionAuthData),
    )
    .provideValue('accountRepository', getPrismaAccountRepository())
    .provideValue('idGenerator', getUuidv4IdGenerator())
    .provideValue('userCreatedEventPublisher', getUserCreatedEventPublisher())
    .injectClass(OAuthService);
