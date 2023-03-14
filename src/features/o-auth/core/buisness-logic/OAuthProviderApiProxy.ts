import { IOAuthApiManagerFactory } from './IOAuthApiManagerFactory';
import { IOAuthApiManager } from './IOAuthApiManager';
import { OAuthProvider } from './OAuthProvider';
import { OAuthApiUserDataDto } from './OAuthApiUserDataDto';

export abstract class OAuthProviderApiProxy {
  protected abstract provider: OAuthProvider;

  private apiManager: IOAuthApiManager | undefined;

  public constructor(private apiManagerFactory: IOAuthApiManagerFactory) {}

  protected getApiManager(): IOAuthApiManager {
    if (!this.apiManager) {
      this.apiManager = this.apiManagerFactory.create(this.provider);
    }
    return this.apiManager;
  }

  public abstract getAccessToken(code: string): Promise<string>;

  public abstract getUserData(
    accessToken: string,
  ): Promise<OAuthApiUserDataDto>;
}
