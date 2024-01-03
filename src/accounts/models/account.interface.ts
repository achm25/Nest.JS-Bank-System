import * as mongoose from 'mongoose';
import { Transaction } from '../../transactions/models/transaction.interface';

export interface Account extends mongoose.Document {
  id: string;
  hash: string;
  username: string;
  firstName: string;
  secondName: string;
  registerDate: string;
  balance: number;
  transactions: mongoose.Types.ObjectId[] | Transaction[];
}
