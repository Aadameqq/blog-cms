import { NextFunction, Request, Response } from 'express';
import { UnauthorizedServerError } from '@helpers/server-errors';
import { catchErrors } from './catchErrors';

export const requireSessionAccount = () =>
  catchErrors((req: Request, res: Response, next: NextFunction) => {
    if (!req.optionalAccount) {
      throw new UnauthorizedServerError();
    }
    req.account = req.optionalAccount;
  });
