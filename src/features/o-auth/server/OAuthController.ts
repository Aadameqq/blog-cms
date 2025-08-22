import { IOAuthService } from '@o-auth/core';
import { OauthCodeDto } from './dtos/OauthCodeDto';
import { OauthProviderTypeDto } from './dtos/OauthProviderTypeDto';
import { DomainErrors } from '../../../helpers/domain-errors';
import { MissingCodeValueDomainError } from '../core/business-logic/MissingCodeValueDomainError';

const domainErrorsToErrorMessagesMap = {
  [new MissingCodeValueDomainError().toString()]: 'Code is missing',
};

export class OAuthController {
  public constructor(private oAuthService: IOAuthService) {}

  public static inject = ['oAuthService'] as const;

  public auth = async (
    codeDto: OauthCodeDto,
    providerTypeDto: OauthProviderTypeDto,
  ) => {
    try {
      await this.oAuthService.handleAuthentication(
        codeDto.code,
        providerTypeDto.providerType,
      );
    } catch (err) {
      if (err instanceof DomainErrors) {
        const errorMessages = err.domainErrors.map(
          (domainError) =>
            domainErrorsToErrorMessagesMap[domainError.toString()],
        );
      }
    }
  };
}
