import {
  Account,
  ICreateAccountRepository,
  ICredentialsProvider,
  IFindOneAccountRepository,
} from '@auth/core';
import { IIdGenerator } from '@helpers/id-generator';
import {
  UserCreatedEventDto,
  IPublishUserCreatedEventPublisher,
} from '@user/core';
import { IOAuthProviderApiProxyFactory } from '../interfaces/IOAuthProviderApiProxyFactory';
import { ICreateOauthDataRepository } from '../interfaces/ICreateOauthDataRepository';
import { OAuthData } from './OAuthData';
import { IFindOneByOAuthIdOAuthDataRepository } from '../interfaces/IFindOneByOAuthIdOAuthDataRepository';
import { IOAuthService } from '../interfaces/IOAuthService';
import { LackOfDataConsistencyBetweenAuthAndOAuthContextsError } from './LackOfDataConsistencyBetweenAuthAndOAuthContextsError';
import { OAuthApiUserDataDto } from './OAuthApiUserDataDto';

export class OAuthService implements IOAuthService {
  public constructor(
    private oAuthDataRepository: ICreateOauthDataRepository &
      IFindOneByOAuthIdOAuthDataRepository,
    private providerApiProxyFactory: IOAuthProviderApiProxyFactory,
    private credentialsProvider: ICredentialsProvider,
    private accountRepository: ICreateAccountRepository &
      IFindOneAccountRepository,
    private idGenerator: IIdGenerator,
    private userCreatedEventPublisher: IPublishUserCreatedEventPublisher,
  ) {}

  public static inject = [
    'oAuthDataRepository',
    'providerApiProxyFactory',
    'credentialsProvider',
    'accountRepository',
    'idGenerator',
    'userCreatedEventPublisher',
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
    const eventDto = new UserCreatedEventDto(
      id,
      apiUserData.username,
      apiUserData.avatarUrl,
    );
    this.userCreatedEventPublisher.publish(eventDto);
  }
}
