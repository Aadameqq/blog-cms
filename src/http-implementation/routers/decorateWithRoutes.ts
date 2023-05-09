import express, { Application } from 'express';
import { apiRouter } from './api/apiRouter';
import { oAuthRouter } from './oAuth/oAuthRouter';

export const decorateWithRoutes = (app: Application): Application => {
  const mainRouter = express.Router();
  mainRouter.use('/api', apiRouter);
  mainRouter.use('/oauth', oAuthRouter);
  return app;
};
