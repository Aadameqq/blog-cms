import { DomainError } from './DomainError';

export class DomainErrors extends Error {
  public readonly domainErrors: DomainError[];

  public constructor(domainErrors: DomainError[] = []) {
    super();
    this.domainErrors = [...domainErrors];
  }

  public add = (domainError: DomainError) => {
    this.domainErrors.push(domainError);
  };

  public isEmpty = () => this.domainErrors.length === 0;

  public throwIfNotEmpty = () => {
    if (!this.isEmpty()) throw this;
  };

  public mergeWith = (otherInstance: DomainErrors) => {
    otherInstance.domainErrors.forEach((error) => {
      this.add(error);
    });
  };
}
