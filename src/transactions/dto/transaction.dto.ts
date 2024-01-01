import { IsString, IsEnum, IsDate, Min } from 'class-validator';
import { TransactionStatus, TransactionType } from '../../constants';

export class TransactionDto {
  @IsDate()
  date: Date;

  @IsString()
  fromAccountNumber: string;

  @IsString()
  toAccountNumber: string;

  @IsEnum(TransactionStatus)
  status: TransactionStatus = TransactionStatus.CREATED;

  @IsEnum(TransactionType)
  type: TransactionType = TransactionType.WITHDRAW;

  @Min(0)
  amount: number;
}
