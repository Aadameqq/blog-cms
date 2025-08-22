import { IsDefined, IsString } from 'class-validator';

export class OauthProviderTypeDto {
  @IsDefined()
  @IsString()
  public readonly providerType: string;
}
