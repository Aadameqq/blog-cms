import * as process from 'process';

export const getConfigVariable = (varName: string) => {
  const value = process.env[varName];
  if (!value) throw new Error(`env variable ${varName} is missing`);
  return value;
};
