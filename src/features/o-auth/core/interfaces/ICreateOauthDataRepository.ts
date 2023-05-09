import { OAuthData } from '../business-logic/OAuthData';

export interface ICreateOauthDataRepository {
  create(oAuthData: OAuthData): Promise<OAuthData>;
}
