import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { DepositDto, WithdrawDto } from './dto';
import { GetUser } from '../auth/decorator';
import { User } from '../users';

@Controller('transaction')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get('/data')
  async getUserTransactions(@GetUser('id') userId: string) {
    return await this.transactionService.getUserTransactions(userId);
  }

  @Post('/deposit')
  @HttpCode(HttpStatus.OK)
  async deposit(@GetUser() user: User, @Body() depositDto: DepositDto) {
    return await this.transactionService.deposit(user, depositDto);
  }

  @Post('/withdraw')
  @HttpCode(HttpStatus.OK)
  async withdraw(
    @GetUser('id') userId: string,
    @Body() withdrawDto: WithdrawDto,
  ) {
    return await this.transactionService.withdraw(userId, withdrawDto);
  }
}
