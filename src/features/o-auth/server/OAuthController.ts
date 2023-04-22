import { IOAuthService } from '@o-auth/core';
import { OauthCodeDto } from './dtos/OauthCodeDto';
import { OauthProviderTypeDto } from './dtos/OauthProviderTypeDto';

export class OAuthController {
  public constructor(private oAuthService: IOAuthService) {}

  public static inject = ['oAuthService'] as const;

  public auth = async (
    codeDto: OauthCodeDto,
    providerTypeDto: OauthProviderTypeDto,
  ) => {
    await this.oAuthService.handleAuthentication(
      codeDto.code,
      providerTypeDto.providerType,
    );
  };
}
