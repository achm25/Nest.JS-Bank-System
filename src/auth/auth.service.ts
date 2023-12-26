import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../shared/users/user.interface';
import { Model } from 'mongoose';
import { RegisterDto, SignInDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}

  async register(dto: RegisterDto) {
    try {
      const newUser = new this.userModel({
        firstName: dto.firstName,
        secondName: dto.secondName,
        password: dto.password,
        username: dto.username,
      });
      const res = await newUser.save();
      return res.id as string;
    } catch (e) {
      throw e;
    }
  }

  async singIn(dto: SignInDto) {
    let user;
    try {
      user = await this.userModel.findOne({ ...dto }).exec();
    } catch (e) {
      throw e;
    }
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user.username as string;
  }
}
