import { createInjector } from 'typed-inject';

export * from './business-logic/IIdGenerator';
import { Uuidv4IdGenerator } from '@id-generator/adapters/Uuidv4IdGenerator';

export const getUuidv4IdGenerator = () =>
  createInjector().injectClass(Uuidv4IdGenerator);
