import { createInjector } from 'typed-inject';
import { getOAuthService } from '@o-auth/core';
import { SetSessionAuthData } from '@auth/core';
import { OAuthController } from '@o-auth/server/OAuthController';

export const getOAuthController = (setSessionAuthData: SetSessionAuthData) =>
  createInjector()
    .provideValue('oAuthService', getOAuthService(setSessionAuthData))
    .injectClass(OAuthController);
