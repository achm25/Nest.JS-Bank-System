import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  hash: { type: String, required: true },
  firstName: String,
  secondName: String,
  address: String,
  registerDate: Date,
});
