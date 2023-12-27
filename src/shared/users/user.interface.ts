import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  id: string;
  hash: string;
  username: string;
  firstName: string;
  secondName: string;
  registerDate: string;
}
