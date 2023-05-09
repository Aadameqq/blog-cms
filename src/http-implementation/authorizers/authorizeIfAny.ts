import { Request } from 'express';
import { AuthorizeIf } from './AuthorizeIf';

export const authorizeIfAny =
  (...authorizeIfs: AuthorizeIf[]): AuthorizeIf =>
  async (req: Request) => {
    const authorizeIfsOutputs = await Promise.all(
      authorizeIfs.map((fn) => fn(req)),
    );
    return authorizeIfsOutputs.some((val) => val);
  };
