import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  id: string;
  password: string;
  username: string;
  firstName: string;
  secondName: string;
  registerDate: string;
}
