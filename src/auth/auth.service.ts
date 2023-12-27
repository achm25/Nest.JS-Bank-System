import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../shared/users/user.interface';
import { Model } from 'mongoose';
import { RegisterDto, SignInDto } from './dto/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}

  async register(dto: RegisterDto) {
    try {
      const hash = await argon.hash(dto.password);
      const newUser = new this.userModel({
        firstName: dto.firstName,
        secondName: dto.secondName,
        username: dto.username,
        hash,
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
      user = await this.userModel.findOne({ username: dto.username }).exec();
    } catch (e) {
      throw e;
    }
    if (!user) {
      throw new NotFoundException('Could not find user');
    }

    const passwordMatch = await argon.verify(user.hash, dto.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Password Error');
    }

    return user;
  }
}
