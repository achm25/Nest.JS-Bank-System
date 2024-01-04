import * as mongoose from 'mongoose';
import { RoleType } from '../constants';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  hash: { type: String, required: true },
  firstName: String,
  secondName: String,
  address: String,
  registerDate: Date,
  role: {
    type: String,
    enum: Object.values(RoleType),
    default: RoleType.USER,
  },
});
