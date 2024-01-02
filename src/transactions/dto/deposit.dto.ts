import { IsDate, IsEnum, IsString, Min } from 'class-validator';
import { TransactionType } from '../../constants';

export class DepositDto {
  @IsDate()
  date: Date;

  @IsString()
  fromAccountNumber: string;

  @IsString()
  toAccountNumber: string;

  @IsEnum(TransactionType)
  type: TransactionType = TransactionType.WITHDRAW;

  @Min(0)
  amount: number;
}
