import { Account } from '@auth/core/business-logic/Account';
import { ICreateAccountRepository } from '../business-logic/ICreateAccountRepository';
import { prismaClient } from '../../../../database/prismaClient';
import { IFindOneAccountRepository } from '../business-logic/IFindOneAccountRepository';

export class PrismaAccountRepository
  implements ICreateAccountRepository, IFindOneAccountRepository
{
  private model;

  public constructor() {
    this.model = prismaClient.account;
  }

  public async create(account: Account) {
    await this.model.create({
      data: account,
    });

    return account;
  }

  public async findOne(id: string): Promise<Account | false> {
    const foundAccount = await this.model.findFirst({
      where: { id },
    });
    if (!foundAccount) return false;

    return foundAccount;
  }
}
