import winston from 'winston';
import * as process from 'process';

const formatTimestamp = (timestamp: string) =>
  timestamp.replace('T', ' ').replace('Z', '').slice(0, -4);

const getDevelopmentFormat = () =>
  winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      (info) =>
        `[${formatTimestamp(info.timestamp)}] ${info.level}: ${info.message}`,
    ),
  );

const getProductionFormat = () =>
  winston.format.combine(winston.format.timestamp(), winston.format.json());

const getFormat = () =>
  process.env.NODE_ENV === 'development'
    ? getDevelopmentFormat()
    : getProductionFormat();

export const logger = winston.createLogger({
  format: getFormat(),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
  ],
});
