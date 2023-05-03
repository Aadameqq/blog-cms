export abstract class DomainError extends Error {
  public abstract readonly name: string;
}
