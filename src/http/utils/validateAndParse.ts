import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import {
  validate as validateWithClassValidator,
  ValidationError,
} from 'class-validator';
import { ErrorMessage, formatErrorMessage } from './formatErrorMessage';

export const enum ValidationSchemaLocations {
  BODY = 'body',
  PARAMS = 'params',
  QUERY = 'query',
}

const formatErrors = (errors: ValidationError[]) =>
  errors.reduce((acc, errorsCategory) => {
    if (!errorsCategory.constraints) return acc;

    const newErrorMessages = Object.values(errorsCategory.constraints).map(
      (error) => formatErrorMessage(error),
    );

    return [...acc, ...newErrorMessages];
  }, [] as ErrorMessage[]);

export const validateAndParse =
  (schema: ClassConstructor<object>, location: ValidationSchemaLocations) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(schema, req[location]);
    req.body = instance;

    const errors = await validateWithClassValidator(instance);

    if (errors.length === 0) return next();

    const formattedErrors = formatErrors(errors);

    res.status(400).json({ errors: formattedErrors });
  };
