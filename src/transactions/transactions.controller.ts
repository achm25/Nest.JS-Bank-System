import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { DepositDto, WithdrawDto } from './dto';
import { GetUser } from '../auth/decorator';

@Controller('transaction')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get('/:id/transactions')
  async transactionsList(@Param('id') id: string) {
    return await this.transactionService.transactionsList(id);
  }

  @Post('/deposit')
  @HttpCode(HttpStatus.OK)
  async deposit(@GetUser('id') userId: string, @Body() depositDto: DepositDto) {
    return await this.transactionService.deposit(userId, depositDto);
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
