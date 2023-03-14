import express from 'express';
import { apiRouter } from './api/apiRouter';
import { oAuthRouter } from './oAuth/oAuthRouter';

const mainRouter = express.Router();

mainRouter.use('/api', apiRouter);
mainRouter.use('/oauth', oAuthRouter);

export { mainRouter };
