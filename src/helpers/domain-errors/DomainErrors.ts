import { DomainError } from './DomainError';

export class DomainErrors extends Error {
  public constructor(public readonly domainErrors: DomainError[] = []) {
    super();
  }

  public add = (domainError: DomainError) => {
    this.domainErrors.push(domainError);
  };

  public isEmpty = () => this.domainErrors.length === 0;

  public throwIfNotEmpty = () => {
    if (!this.isEmpty()) throw this;
  };
}
