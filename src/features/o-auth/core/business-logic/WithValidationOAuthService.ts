import { DomainErrors } from '@helpers/domain-errors';
import { IOAuthService } from '../interfaces/IOAuthService';
import { MissingCodeValueDomainError } from './MissingCodeValueDomainError';

export class WithValidationOAuthService implements IOAuthService {
  public constructor(private decorated: IOAuthService) {}

  public handleAuthentication(
    code: string,
    providerType: string,
  ): Promise<void> {
    const errors = new DomainErrors();
    if (!code) {
      errors.add(new MissingCodeValueDomainError());
    }
    if (!providerType) {
      // TODO: implement
    }
    errors.throwIfNotEmpty();

    return this.decorated.handleAuthentication(code, providerType);
  }
}
