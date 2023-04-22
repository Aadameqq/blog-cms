import express from 'express';
import { getOAuthController } from '@o-auth/server';
import { OauthCodeDto } from '@o-auth/server/dtos/OauthCodeDto';
import { OauthProviderTypeDto } from '@o-auth/server/dtos/OauthProviderTypeDto';
import {
  validateAndParse,
  ValidationSchemaLocations,
} from '../../utils/validateAndParse';
import { catchErrors } from '../../utils/catchErrors';
import { getConfigVariable } from '../../../utils/getConfigVariable';

const oAuthRouter = express.Router();

oAuthRouter.get(
  '/:providerType/redirect',
  validateAndParse(OauthCodeDto, ValidationSchemaLocations.QUERY),
  validateAndParse(OauthProviderTypeDto, ValidationSchemaLocations.PARAMS),
  catchErrors(async (req, res) => {
    const setAuthData = (accountId: string, accountPermissions: string[]) => {
      req.sessionWrapper.createSession({
        account: {
          id: accountId,
          permissions: accountPermissions,
        },
      });
    };

    const oAuthController = getOAuthController(setAuthData);
    await oAuthController.auth(
      req.query as unknown as OauthCodeDto,
      req.params as unknown as OauthProviderTypeDto,
    );
    res.redirect(getConfigVariable('O_AUTH_REDIRECT_URL'));
  }),
);

export { oAuthRouter };
