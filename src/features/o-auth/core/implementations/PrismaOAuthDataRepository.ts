import { prismaClient } from '@database/prismaClient';
import { OAuthData } from '../business-logic/OAuthData';
import { IFindOneByOAuthIdOAuthDataRepository } from '../interfaces/IFindOneByOAuthIdOAuthDataRepository';
import { ICreateOauthDataRepository } from '../interfaces/ICreateOauthDataRepository';

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
