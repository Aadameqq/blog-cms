import express from 'express';
import { helloRouter } from './helloRouter';

const apiRouter = express.Router();

apiRouter.use('/hello', helloRouter);

export { apiRouter };
