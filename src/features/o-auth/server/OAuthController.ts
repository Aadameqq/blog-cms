import { OauthCodeDto } from './dtos/OauthCodeDto';
import { OauthProviderTypeDto } from './dtos/OauthProviderTypeDto';
import { OAuthService } from '../core/business-logic/OAuthService';

export class OAuthController {
  public constructor(private oAuthService: OAuthService) {}

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
