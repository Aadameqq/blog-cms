import { Request } from 'express';
import { AuthorizeIf } from './AuthorizeIf';

export const authorizeIfEvery =
  (...authorizeIfs: AuthorizeIf[]): AuthorizeIf =>
  async (req: Request) => {
    const authorizeIfsOutputs = await Promise.all(
      authorizeIfs.map((fn) => fn(req)),
    );
    return authorizeIfsOutputs.every((val) => val);
  };
