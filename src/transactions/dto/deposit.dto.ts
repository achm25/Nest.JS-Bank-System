import { IsOptional, IsString } from 'class-validator';

export class DepositDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  secondName?: string;
}
