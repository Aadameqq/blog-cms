import { createInjector } from 'typed-inject';
import { createOAuthService } from '@o-auth/core';
import { SetSessionAuthData } from '@auth/core';
import { OAuthController } from './OAuthController';

export * from './dtos/OauthCodeDto';
export * from './dtos/OauthProviderTypeDto';

export const createOAuthController = (setSessionAuthData: SetSessionAuthData) =>
  createInjector()
    .provideValue('oAuthService', createOAuthService(setSessionAuthData))
    .injectClass(OAuthController);
