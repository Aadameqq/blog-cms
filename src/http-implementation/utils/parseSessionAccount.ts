import { NextFunction, Request, Response } from 'express';
import { catchErrors } from './catchErrors';

export const parseSessionAccount = (
  req: Request,
  res: Response,
  next: NextFunction,
) =>
  catchErrors(() => {
    const sessData = req.sessionWrapper.getSessionDataIfExists();
    if (sessData) req.optionalAccount = sessData.account;
  });
