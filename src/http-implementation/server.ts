import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from 'swagger/swagger.json';
import { decorateWithRoutes } from './routers/decorateWithRoutes';
import { logger } from './utils/logger';
import { configureSession } from './utils/configureSession';
import { configureSessionWrapper } from './utils/configureSessionWrapper';

dotenv.config();

const PORT = process.env.PORT || 5500;

const app = express();

app.use(morgan('tiny'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(cookieParser());
app.use(express.json());
app.use(configureSession());
app.use(configureSessionWrapper());

const decoratedApp = decorateWithRoutes(app);

decoratedApp.listen(PORT, async () => {
  logger.info(`Listening on http://localhost:${PORT}`);
});
