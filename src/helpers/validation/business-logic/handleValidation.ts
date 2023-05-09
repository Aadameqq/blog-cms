import { IValidator } from '../interfaces/IValidator';
import { DomainErrors } from '../../domain-errors';

export const handleValidation = (...validators: IValidator[]) => {
  const errors = new DomainErrors();

  validators.forEach((validator) => {
    const result = validator.validate();
    errors.mergeWith(result);
  });

  errors.throwIfNotEmpty();
};
