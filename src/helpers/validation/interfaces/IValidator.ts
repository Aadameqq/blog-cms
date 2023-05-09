import { DomainErrors } from '@helpers/domain-errors';

export interface IValidator {
  validate(): DomainErrors;
}
