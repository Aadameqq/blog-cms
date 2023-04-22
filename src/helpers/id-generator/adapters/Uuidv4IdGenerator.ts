import { v4 as uuidv4 } from 'uuid';
import { IIdGenerator } from '../business-logic/IIdGenerator';

export class Uuidv4IdGenerator implements IIdGenerator {
  public generate(): string {
    return uuidv4();
  }
}
