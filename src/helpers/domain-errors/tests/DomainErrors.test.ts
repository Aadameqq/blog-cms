import { DomainErrors } from '../DomainErrors';

describe('DomainErrors', () => {
  const testError1 = new Error('1');
  const testError2 = new Error('2');
  const testErrors = [testError1, testError2];

  describe('.constructor', () => {
    test('Should throw error with errors passed to constructor', () => {
      expect(new DomainErrors(testErrors).domainErrors).toEqual(testErrors);
    });
  });

  describe('.add', () => {
    test('Should add given error to domainErrors array', () => {
      const testDomainErrors = new DomainErrors();

      testDomainErrors.add(testError1);
      expect(testDomainErrors.domainErrors).toEqual([testError1]);

      testDomainErrors.add(testError2);
      expect(testDomainErrors.domainErrors).toEqual(testErrors);
    });
  });

  describe('.isEmpty', () => {
    test('Should return that DomainErrors is empty When there are no errors', () => {
      expect(new DomainErrors().isEmpty()).toBe(true);
    });

    test('Should return that DomainErrors is not empty When added one error', () => {
      const testDomainErrors = new DomainErrors();
      testDomainErrors.add(testError1);
      expect(testDomainErrors.isEmpty()).toBe(false);
    });
  });

  describe('.throwIfNotEmpty', () => {
    test('Should not throw error When there are no errors', () => {
      const testDomainErrors = new DomainErrors();
      expect(testDomainErrors.throwIfNotEmpty).not.toThrowError();
    });

    test('Should throw error When added one error', () => {
      const testDomainErrors = new DomainErrors();
      testDomainErrors.add(testError1);
      expect(testDomainErrors.throwIfNotEmpty).toThrowError();
    });
  });
  describe('.mergeWith', () => {
    test('Should merge two domain errors instances', () => {
      const testErrors2 = [new Error('3'), new Error('4')];
      const testDomainErrors1 = new DomainErrors(testErrors);
      const testDomainErrors2 = new DomainErrors(testErrors2);

      testDomainErrors1.mergeWith(testDomainErrors2);

      const expectedErrors = [...testErrors, ...testErrors2];
      expect(testDomainErrors1.domainErrors).toEqual(expectedErrors);
    });
  });
});
