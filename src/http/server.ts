import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import morgan from 'morgan';
// @ts-ignore
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from 'swagger/swagger.json';
import { decorateWithRouters } from './routers/decorateWithRouters';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 5500;

const app = express();

app.use(morgan('tiny'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const decoratedApp = decorateWithRouters(app);

decoratedApp.listen(PORT, async () => {
  logger.info(`Listening on http://localhost:${PORT}`);
});
