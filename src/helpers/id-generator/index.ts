import { createInjector } from 'typed-inject';
import { Uuidv4IdGenerator } from './adapters/Uuidv4IdGenerator';

export * from './business-logic/IIdGenerator';

export const getUuidv4IdGenerator = () =>
  createInjector().injectClass(Uuidv4IdGenerator);
