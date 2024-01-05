import { Schema } from 'mongoose';
import { TransactionStatus } from '../../constants/transaction-status.constant';
import { TransactionType } from '../../constants/transaction-type.constant';
import mongoose from 'mongoose';

export interface Transaction extends mongoose.Document {
  user: Schema.Types.ObjectId;
  date: Date;
  fromAccountNumber: string;
  toAccountNumber?: string;
  status: TransactionStatus;
  type: TransactionType;
  amount: number;
}
