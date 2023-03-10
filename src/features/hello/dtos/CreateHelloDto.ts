import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateHelloDto {
  @IsDefined()
  @MinLength(2)
  @MaxLength(10)
  public readonly nickname: string;

  @IsDefined()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  public readonly age: number;
}
