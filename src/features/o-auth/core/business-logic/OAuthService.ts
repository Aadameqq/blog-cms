import { ICreateAccountRepository } from '@auth/core/business-logic/ICreateAccountRepository';
import { IFindOneAccountRepository } from '@auth/core/business-logic/IFindOneAccountRepository';
import { Account } from '@auth/core/business-logic/Account';
import { ICredentialsProvider } from '@auth/core';
import { IIdGenerator } from '@id-generator';
import { LackOfDataConsistencyBetweenAuthAndOAuthContextsError } from '@o-auth/core/business-logic/LackOfDataConsistencyBetweenAuthAndOAuthContextsError';
import { CreateUserEventDto, INotifyCreateUserPublisher } from '@user/core';
import { OAuthApiUserDataDto } from '@o-auth/core/business-logic/OAuthApiUserDataDto';
import { IOAuthProviderApiProxyFactory } from './IOAuthProviderApiProxyFactory';
import { ICreateOauthDataRepository } from './ICreateOauthDataRepository';
import { OAuthData } from './OAuthData';
import { IFindOneByOAuthIdOAuthDataRepository } from './IFindOneByOAuthIdOAuthDataRepository';

export class OAuthService {
  public constructor(
    private oAuthDataRepository: ICreateOauthDataRepository &
      IFindOneByOAuthIdOAuthDataRepository,
    private providerApiProxyFactory: IOAuthProviderApiProxyFactory,
    private credentialsProvider: ICredentialsProvider,

    private accountRepository: ICreateAccountRepository &
      IFindOneAccountRepository,
    private idGenerator: IIdGenerator,

    private createUserPublisher: INotifyCreateUserPublisher,
  ) {}

  public static inject = [
    'oAuthDataRepository',
    'providerApiProxyFactory',
    'credentialsProvider',
    'accountRepository',
    'idGenerator',
    'createUserPublisher',
  ] as const;

  public async handleAuthentication(code: string, providerType: string) {
    const apiUserData = await this.getUserDataFromOAuthProvider(
      providerType,
      code,
    );

    const foundOAuthData = await this.oAuthDataRepository.findOneByOAuthId(
      apiUserData.oAuthId,
    );

    const account = foundOAuthData
      ? await this.findExistingAccount(foundOAuthData)
      : await this.handleUserCreationAndReturnCreatedAccount(apiUserData);

    this.credentialsProvider.provide(account);
  }

  private async getUserDataFromOAuthProvider(
    providerType: string,
    code: string,
  ) {
    const providerApiProxy = this.providerApiProxyFactory.create(providerType);
    const accessToken = await providerApiProxy.getAccessToken(code);
    const apiUserData = await providerApiProxy.getUserData(accessToken);
    return apiUserData;
  }

  private async findExistingAccount(foundOAuthData: OAuthData) {
    const account = await this.accountRepository.findOne(foundOAuthData.id);
    if (!account)
      throw new LackOfDataConsistencyBetweenAuthAndOAuthContextsError(
        foundOAuthData.id,
      );
    return account;
  }

  private async handleUserCreationAndReturnCreatedAccount(
    apiUserData: OAuthApiUserDataDto,
  ) {
    const id = this.idGenerator.generate();
    await this.createOAuthData(id, apiUserData.oAuthId);
    this.emitCreateUserEvent(id, apiUserData);
    return this.createAndGetAccount(id);
  }

  private async createOAuthData(id: string, oAuthId: string) {
    const oAuthData = new OAuthData(id, oAuthId);
    await this.oAuthDataRepository.create(oAuthData);
  }

  private async createAndGetAccount(id: string) {
    const account = new Account(id);
    await this.accountRepository.create(account);
    return account;
  }

  private emitCreateUserEvent(id: string, apiUserData: OAuthApiUserDataDto) {
    const eventDto = new CreateUserEventDto(
      id,
      apiUserData.username,
      apiUserData.avatarUrl,
    );
    this.createUserPublisher.notify(eventDto);
  }
}
