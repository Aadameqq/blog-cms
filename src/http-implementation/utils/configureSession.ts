import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { getConfigVariable, isDevelopmentEnv } from '@helpers/other';

const sessionRedisClient = createClient({
  url: getConfigVariable('REDIS_URL'),
});

sessionRedisClient.connect();

const redisStore = new RedisStore({
  client: sessionRedisClient,
  prefix: 'blog-cms-session:',
});

const THREE_MINUTES_IN_MILLISECONDS = 3 * 60 * 1000;

export const configureSession = () =>
  session({
    secret: getConfigVariable('SESSION_SECRET'),
    name: 'session_id',
    cookie: {
      httpOnly: true,
      secure: !isDevelopmentEnv(),
      sameSite: true, // TODO: test whether it will work as intended
      maxAge: THREE_MINUTES_IN_MILLISECONDS,
      domain: getConfigVariable('FRONTEND_URL'),
    },
    store: redisStore,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    unset: 'destroy',
  });
