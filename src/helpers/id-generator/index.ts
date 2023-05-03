import { createInjector } from 'typed-inject';
import { Uuidv4IdGenerator } from './implementations/Uuidv4IdGenerator';
import { IIdGenerator } from './interfaces/IIdGenerator';

export * from './interfaces/IIdGenerator';

export const createIdGenerator = (): IIdGenerator =>
  createInjector().injectClass(Uuidv4IdGenerator);
