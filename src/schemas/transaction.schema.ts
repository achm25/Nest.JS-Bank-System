import * as mongoose from 'mongoose';
import { TransactionStatus, TransactionType } from '../constants';

export const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  date: { type: Date, required: true },
  fromAccountNumber: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'accounts',
  },
  toAccountNumber: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'accounts',
  },
  status: {
    type: String,
    enum: Object.values(TransactionStatus),
    default: TransactionStatus.CREATED,
  },
  type: {
    type: String,
    enum: Object.values(TransactionType),
    default: TransactionType.WITHDRAW,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
});
