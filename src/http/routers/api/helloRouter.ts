import express from 'express';
import {
  validateAndParse,
  ValidationSchemaLocations,
} from '../../utils/validateAndParse';
import { catchErrors } from '../../utils/catchErrors';
import { HelloController } from '../../../features/hello/HelloController';
import { CreateHelloDto } from '../../../features/hello/dtos/CreateHelloDto';

const helloRouter = express.Router();

helloRouter.post(
  '/',
  validateAndParse(CreateHelloDto, ValidationSchemaLocations.BODY),
  catchErrors((req, res) => {
    const response = new HelloController().create(req.body);
    res.status(201).json(response);
  }),
);

export { helloRouter };
