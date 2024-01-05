import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetUser } from '../decorator';
import { JwtGuard } from '../auth/guard';
import { AccountsService } from './accounts.service';
import { User } from '../users/models/user.interface';

@UseGuards(JwtGuard)
@Controller('account')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get(':id/me')
  getMe(@GetUser() user: User, @Param('id') accountId: string) {
    return this.accountsService.getAccountData(user, accountId);
  }

  @Get(':id/balance')
  async getBalance(@GetUser() user: User, @Param('id') accountId: string) {
    return this.accountsService.getAccountBalance(user, accountId);
  }

  // @Get(':id/transactions')
  // async getTransactions(@GetUser() user: User, @Param('id') accountId: string) {
  //   return this.accountsService.getAccountTransactions(user, accountId);
  // }
}
