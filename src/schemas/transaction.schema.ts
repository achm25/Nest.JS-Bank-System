import * as mongoose from 'mongoose';
import { TransactionStatus, TransactionType } from '../constants';

export const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  date: { type: Date, required: true },
  fromAccountNumber: {
    type: String,
    required: true,
  },
  toAccountNumber: {
    type: String,
    required: false,
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

// export const TransactionSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
//   date: { type: Date, required: true, validate: { validator: IsDate } },
//   fromAccountNumber: {
//     type: String,
//     required: true,
//     validate: { validator: IsString },
//   },
//   toAccountNumber: {
//     type: String,
//     required: false,
//     validate: { validator: IsString },
//   },
//   status: {
//     type: String,
//     enum: Object.values(TransactionStatus),
//     default: TransactionStatus.CREATED,
//   },
//   type: {
//     type: String,
//     enum: Object.values(TransactionType),
//     default: TransactionType.WITHDRAW,
//   },
//   amount: {
//     type: Number,
//     required: true,
//     validate: { validator: Min(0) },
//     default: 0,
//   },
// });
