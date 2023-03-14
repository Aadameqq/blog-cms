import { OAuthProvider } from './OAuthProvider';
import { IOAuthApiManager } from './IOAuthApiManager';

export interface IOAuthApiManagerFactory {
  create(provider: OAuthProvider): IOAuthApiManager;
}
