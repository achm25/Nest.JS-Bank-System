import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}

  async findUserById(userId: number) {
    try {
      const user = await this.userModel.findById(userId).exec();
      return user;
    } catch (error) {
      throw new Error(` Error updating user: ${error.message}`);
    }
  }

  async editUser(userId: number, dto: EditUserDto) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(userId, dto, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(` Error updating user: ${error.message}`);
    }
  }

  async addAccount(userId: string, accountId: string) {
    await this.userModel
      .findByIdAndUpdate(userId, { $push: { accounts: accountId } })
      .exec();
  }

  async removeAccount(userId: string, accountId: string) {
    await this.userModel
      .findByIdAndUpdate(userId, { $pull: { transactions: accountId } })
      .exec();
  }
}
