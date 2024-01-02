import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
  username: { type: String, required: true },
  hash: { type: String, required: true },
  firstName: String,
  secondName: String,
  registerData: String,
  balance: { type: Number, default: 0 },
});
