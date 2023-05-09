import { createInjector } from 'typed-inject';
import { createApiRequester } from '@helpers/api-requester';
import {
  createAccountRepository,
  getSessionCredentialsProvider,
  SetSessionAuthData,
} from '@auth/core';
import { createIdGenerator } from '@helpers/id-generator';
import { createUserCreatedEventPublisher } from '@user/core';
import { PrismaOAuthDataRepository } from './implementations/PrismaOAuthDataRepository';
import { OAuthProviderApiProxyFactory } from './implementations/OAuthProviderApiProxyFactory';
import { OAuthService } from './business-logic/OAuthService';
import { IOAuthService } from './interfaces/IOAuthService';

export * from './interfaces/IOAuthService';

export const createOAuthService = (
  setSessionAuthData: SetSessionAuthData,
): IOAuthService =>
  createInjector()
    .provideClass('oAuthDataRepository', PrismaOAuthDataRepository)
    .provideValue('apiRequester', createApiRequester())
    .provideClass('providerApiProxyFactory', OAuthProviderApiProxyFactory)
    .provideValue(
      'credentialsProvider',
      getSessionCredentialsProvider(setSessionAuthData),
    )
    .provideValue('accountRepository', createAccountRepository())
    .provideValue('idGenerator', createIdGenerator())
    .provideValue(
      'userCreatedEventPublisher',
      createUserCreatedEventPublisher(),
    )
    .injectClass(OAuthService);
