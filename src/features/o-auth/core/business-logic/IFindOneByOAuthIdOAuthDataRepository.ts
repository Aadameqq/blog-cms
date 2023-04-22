import { OAuthData } from './OAuthData';

export interface IFindOneByOAuthIdOAuthDataRepository {
  findOneByOAuthId(oAuthId: string): Promise<OAuthData | false>;
}
