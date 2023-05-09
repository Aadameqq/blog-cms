import { OAuthData } from '../business-logic/OAuthData';

export interface IFindOneByOAuthIdOAuthDataRepository {
  findOneByOAuthId(oAuthId: string): Promise<OAuthData | false>;
}
