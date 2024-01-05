import { IsEnum, IsString, Min } from 'class-validator';
import { TransactionType } from '../../constants';

export class TransferDto {
  @IsString()
  fromAccountNumber: string;

  @IsString()
  toAccountNumber: string;

  @IsEnum(TransactionType)
  type: TransactionType = TransactionType.TRANSFER;

  @Min(0)
  amount: number;
}
