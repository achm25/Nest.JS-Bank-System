import * as mongoose from 'mongoose';
import { Transaction } from '../../transactions/models/transaction.interface';

export interface User extends mongoose.Document {
  id: string;
  hash: string;
  username: string;
  firstName: string;
  secondName: string;
  registerDate: string;
  transactions: mongoose.Types.ObjectId[] | Transaction[];
}
