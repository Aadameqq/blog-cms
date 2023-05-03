import { NextFunction, Request, Response } from 'express';
import { UnauthorizedServerError } from '@helpers/server-errors';
import { AuthorizeIf } from '../authorizers/AuthorizeIf';
import { catchErrors } from './catchErrors';

export const checkAuthorizer = (authorizeIf: AuthorizeIf) =>
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.account)
      throw new Error(
        'You forgot to call requireSessionAccount before checkAuthorizer',
      );
    if (await authorizeIf(req)) return next();
    throw new UnauthorizedServerError();
  });
