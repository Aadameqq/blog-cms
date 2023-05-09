export abstract class DomainError extends Error {
  public abstract readonly name: string;

  public toString() {
    return this.name;
  }
}
