import express from 'express';
import { v1Router } from './v1/v1Router';

const mainRouter = express.Router();

mainRouter.use('/v1', v1Router);

export { mainRouter };
