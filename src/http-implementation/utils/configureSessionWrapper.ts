import { configureSessionWrapper as configure } from 'express-session-wrapper';

const FOUR_HOURS_IN_MILLISECONDS = 4 * 60 * 60 * 1000;

export const configureSessionWrapper = () =>
  configure({
    absoluteTimeoutInMilliseconds: FOUR_HOURS_IN_MILLISECONDS,
  });
