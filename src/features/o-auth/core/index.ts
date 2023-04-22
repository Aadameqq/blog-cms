import { createInjector } from 'typed-inject';
import { OAuthService } from '@o-auth/core/business-logic/OAuthService';
import { PrismaOAuthDataRepository } from '@o-auth/core/adapters/PrismaOAuthDataRepository';
import { OAuthProviderApiProxyFactory } from '@o-auth/core/adapters/OAuthProviderApiProxyFactory';
import { getAxiosApiRequester } from '@api-requester';
import {
  getPrismaAccountRepository,
  getSessionCredentialsProvider,
  SetSessionAuthData,
} from '@auth/core';
import { getUuidv4IdGenerator } from '@id-generator';
import { getCreateUserPublisher } from '@user/core';

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
    .provideValue('createUserPublisher', getCreateUserPublisher())
    .injectClass(OAuthService);
