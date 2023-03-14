import express from 'express';
import { OauthCodeDto } from '@o-auth/server/dtos/OauthCodeDto';
import { OauthProviderTypeDto } from '@o-auth/server/dtos/OauthProviderTypeDto';
import { OAuthController } from '@o-auth/server/OAuthController'; // TODO: export from module correctly
import {
  validateAndParse,
  ValidationSchemaLocations,
} from '../../utils/validateAndParse';
import { catchErrors } from '../../utils/catchErrors';

const oAuthRouter = express.Router();

oAuthRouter.get(
  '/:providerType/redirect',
  validateAndParse(OauthCodeDto, ValidationSchemaLocations.QUERY),
  validateAndParse(OauthProviderTypeDto, ValidationSchemaLocations.PARAMS),
  catchErrors((req, res) =>
    new OAuthController().auth(
      req.query as unknown as OauthCodeDto,
      req.params as unknown as OauthProviderTypeDto,
    ),
  ),
);

export { oAuthRouter };
