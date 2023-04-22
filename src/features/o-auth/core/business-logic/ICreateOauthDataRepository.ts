import { OAuthData } from './OAuthData';

export interface ICreateOauthDataRepository {
  create(oAuthData: OAuthData): Promise<OAuthData>;
}
