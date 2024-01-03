import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  registerDate: String,
  balance: { type: Number, default: 0 },
});
