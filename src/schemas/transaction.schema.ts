
import * as mongoose from 'mongoose';
import { IsDate, IsString, Min } from 'class-validator';
import { TransactionStatus } from '../constants/transaction-status.constant';
import { TransactionType } from '../constants/transaction-type.constant';

export const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true, validate: { validator: IsDate } },
  fromAccountNumber: {
    type: String,
    required: true,
    validate: { validator: IsString },
  },
  toAccountNumber: {
    type: String,
    required: false,
    validate: { validator: IsString },
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
    validate: { validator: Min(0) },
    default: 0,
  },
});
