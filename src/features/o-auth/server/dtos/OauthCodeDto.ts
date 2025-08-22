import { IsDefined } from 'class-validator';

export class OauthCodeDto {
  @IsDefined()
  public readonly code: string;
}
