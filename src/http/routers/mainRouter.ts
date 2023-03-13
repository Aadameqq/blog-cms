import express from 'express';
import { apiRouter } from './api/apiRouter';

const mainRouter = express.Router();

mainRouter.use('/api', apiRouter);

export { mainRouter };
