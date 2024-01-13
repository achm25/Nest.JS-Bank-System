import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Param,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { DepositDto, TransferDto, WithdrawDto } from './dto';
import { GetUser } from '../decorator';
import { User } from '../users';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('transaction')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get(':id/data')
  async getUserTransactionData(@Param('id') transactionId: string) {
    return await this.transactionService.getTransactionData(transactionId);
  }

  @Get('account/:id')
  async getAccountTransactions(@Param('id') accountId: string) {
    return await this.transactionService.getAccountTransactions(accountId);
  }

  @Post('transfer')
  @HttpCode(HttpStatus.OK)
  async transfer(@GetUser() user: User, @Body() transferDto: TransferDto) {
    return await this.transactionService.transfer(user, transferDto);
  }

  @Post('deposit')
  @HttpCode(HttpStatus.OK)
  async deposit(@GetUser() user: User, @Body() depositDto: DepositDto) {
    return await this.transactionService.deposit(user, depositDto);
  }

  @Post('withdraw')
  @HttpCode(HttpStatus.OK)
  async withdraw(@GetUser() user: User, @Body() withdrawDto: WithdrawDto) {
    return await this.transactionService.withdraw(user, withdrawDto);
  }
}
