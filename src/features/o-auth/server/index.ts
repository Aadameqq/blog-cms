import { createInjector } from 'typed-inject';
import { getOAuthService } from '@o-auth/core';
import { SetSessionAuthData } from '@auth/core';
import { OAuthController } from './OAuthController';

export * from './dtos/OauthCodeDto';
export * from './dtos/OauthProviderTypeDto';

export const getOAuthController = (setSessionAuthData: SetSessionAuthData) =>
  createInjector()
    .provideValue('oAuthService', getOAuthService(setSessionAuthData))
    .injectClass(OAuthController);
