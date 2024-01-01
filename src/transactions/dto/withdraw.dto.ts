import { IsOptional, IsString } from 'class-validator';

export class WithdrawDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  secondName?: string;
}
