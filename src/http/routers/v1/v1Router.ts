import express from 'express';
import { helloRouter } from './helloRouter';

const v1Router = express.Router();

v1Router.use('/hello', helloRouter);

export { v1Router };
