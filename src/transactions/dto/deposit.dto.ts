import { IsEnum, IsString, Min } from 'class-validator';
import { TransactionType } from '../../constants';

export class DepositDto {
  @IsString()
  fromAccountNumber: string;

  @IsString()
  toAccountNumber: string;

  @IsEnum(TransactionType)
  type: TransactionType = TransactionType.DEPOSIT;

  @Min(0)
  amount: number;
}
