// TODO: remove the line below
// eslint-disable-next-line max-classes-per-file
import { ICredentialsProvider } from '@auth';
import { Account } from '@account';
import { ISetDataAuthorizationService } from './ISetDataAuthorizationService';
import { IOAuthProviderApiProxyFactory } from './IOAuthProviderApiProxyFactory';

class OAuthCredentials {
  private type = 'o-auth-credentials';

  public constructor(public readonly oAuthId: string) {}
}

interface CreateOauthCredentialsRepository {
  create(oAuthCredentials: OAuthCredentials, account: Account): void;
}

interface CheckIfExistsOAuthCredentialsRepository {
  exists(oAuthId: string): Promise<boolean>;
}

class OAuthService {
  public constructor(
    private oAuthCredentialsRepository: CreateOauthCredentialsRepository &
      CheckIfExistsOAuthCredentialsRepository,
    private authorizationService: ISetDataAuthorizationService,
    private providerApiProxyFactory: IOAuthProviderApiProxyFactory,
    private credentialsProvider: ICredentialsProvider,
  ) {}

  public async handleAuthentication(code: string, providerType: string) {
    const providerApiProxy = this.providerApiProxyFactory.create(providerType);

    const accessToken = await providerApiProxy.getAccessToken(code);
    const userData = await providerApiProxy.getUserData(accessToken);
    //

    const userCredentials = new OAuthCredentials(userData.oAuthId);
    const userAccount = new Account('someId');

    if (await this.oAuthCredentialsRepository.exists(userCredentials.oAuthId)) {
      await this.oAuthCredentialsRepository.create(
        userCredentials,
        userAccount,
      );
    }
    //
    this.credentialsProvider.provide(userAccount);
  }
}
