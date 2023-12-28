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
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @InjectModel('users') private userModel: Model<User>,
  ) {}

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

    return this.signToken(user.id, user.username);
  }

  async signToken(
    userId: number,
    username: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      username,
    };

    const secret = this.config.get('JWT_SECRET');

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '999999999999m',
      secret: secret,
    });

    return {
      access_token,
    };
  }
}
