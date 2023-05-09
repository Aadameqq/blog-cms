import { DomainError } from '@helpers/domain-errors';

export class MissingCodeValueDomainError extends DomainError {
  public readonly name: string = 'missingCodeValue';
}
