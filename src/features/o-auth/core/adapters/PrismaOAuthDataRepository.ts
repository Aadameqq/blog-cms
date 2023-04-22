import { ICreateOauthDataRepository } from '@o-auth/core/business-logic/ICreateOauthDataRepository';
import { OAuthData } from '../business-logic/OAuthData';
import { prismaClient } from '../../../../database/prismaClient';
import { IFindOneByOAuthIdOAuthDataRepository } from '../business-logic/IFindOneByOAuthIdOAuthDataRepository';

export class PrismaOAuthDataRepository
  implements IFindOneByOAuthIdOAuthDataRepository, ICreateOauthDataRepository
{
  private model;

  public constructor() {
    this.model = prismaClient.oAuthData;
  }

  public async create(oAuthData: OAuthData) {
    const createdOAuthData = await this.model.create({
      data: oAuthData,
    });

    return createdOAuthData;
  }

  public async findOneByOAuthId(oAuthId: string) {
    const data = await this.model.findFirst({ where: { oAuthId } });
    if (!data) return false;

    const oAuthData = new OAuthData(data.id, data.oAuthId);
    return oAuthData;
  }
}
