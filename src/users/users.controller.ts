import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '../decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './users.service';
import { User } from './models/user.interface';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Get('balance')
  getBalance(@GetUser() user: User) {
    return user.balance;
  }

  @Patch('me')
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
