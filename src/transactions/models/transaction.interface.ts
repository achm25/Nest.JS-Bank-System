import { Document, Schema } from 'mongoose';
import { TransactionStatus } from '../../constants/transaction-status.constant';
import { TransactionType } from '../../constants/transaction-type.constant';

export interface Transaction extends Document {
  user: Schema.Types.ObjectId;
  date: Date;
  fromAccountNumber: string;
  toAccountNumber?: string;
  status: TransactionStatus;
  type: TransactionType;
  amount: number;
}
