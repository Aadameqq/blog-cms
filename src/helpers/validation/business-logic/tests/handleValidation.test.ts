import { DomainErrors } from '../../../domain-errors';
import { handleValidation } from '../handleValidatorsSet';

describe('handleValidationSet', () => {
  test('Should not throw error When every validator returned no domain errors', () => {
    const testValidator = {
      validate: () => new DomainErrors(),
    };
    const mockHandleValidation = () =>
      handleValidation(testValidator, testValidator, testValidator);

    expect(mockHandleValidation).not.toThrowError();
  });

  test('Should throw all domain errors returned from validators', () => {
    const testError1 = new Error('1');
    const testError2 = new Error('2');
    const testError3 = new Error('3');
    const testValidator1 = {
      validate: () => new DomainErrors([testError1]),
    };
    const testValidator2 = {
      validate: () => new DomainErrors([testError2, testError3]),
    };

    const mockHandleValidation = () =>
      handleValidation(testValidator1, testValidator2);
    const expectedErrors = [testError1, testError2, testError3];
    const expectedDomainErrors = new DomainErrors(expectedErrors);

    expect(mockHandleValidation).toThrow(expectedDomainErrors);
  });
});
