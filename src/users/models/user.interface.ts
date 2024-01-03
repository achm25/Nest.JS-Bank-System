import * as mongoose from 'mongoose';
import { Account } from '../../accounts/models/account.interface';

export interface User extends mongoose.Document {
  id: string;
  hash: string;
  username: string;
  firstName: string;
  secondName: string;
  registerDate: string;
  accounts: mongoose.Types.ObjectId[] | Account[];
}
