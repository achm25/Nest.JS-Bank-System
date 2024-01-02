import { IsEnum, IsString, Min } from 'class-validator';
import { TransactionType } from '../../constants';

export class WithdrawDto {
  @IsString()
  fromAccountNumber: string;

  @IsEnum(TransactionType)
  type: TransactionType = TransactionType.WITHDRAW;

  @Min(0)
  amount: number;
}
