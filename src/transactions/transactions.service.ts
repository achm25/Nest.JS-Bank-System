import { Injectable, Logger } from '@nestjs/common';
import { ValidatorService } from '../utils/services';
import { DepositDto, WithdrawDto } from './dto';
import { Model } from 'mongoose';
import { Transaction } from './models/transaction.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users';
import { TransactionStatus, TransactionType } from '../constants';

@Injectable()
export class TransactionsService {
  private readonly _logger = new Logger(TransactionsService.name);
  constructor(
    @InjectModel('transactions')
    private transactionModel: Model<Transaction>,
    // private readonly _validatorService: ValidatorService,
  ) {}

  async getUserTransactions(userId: string) {
    const transactions = await this.transactionModel
      .find({ user: userId })
      .exec();
    return transactions;
  }

  async deposit(user: User, depositDto: DepositDto) {
    try {
      const depositTransaction = new this.transactionModel({
        user: user.id,
        date: new Date(),
        fromAccountNumber: depositDto.fromAccountNumber,
        toAccountNumber: depositDto.toAccountNumber,
        status: TransactionStatus.CREATED,
        type: TransactionType.DEPOSIT,
        amount: depositDto.amount,
      });

      const savedTransaction = await depositTransaction.save();
      user.transactions.push(savedTransaction.id);
      await user.save();
      return savedTransaction;
    } catch (error) {
      throw new Error(`Deposit failed: ${error.message}`);
    }
    // this._validatorService.isCorrectRecipient(
    //   senderBill?.id,
    //   recipientBill?.id,
    // );
    //
    // this._validatorService.isCorrectAmountMoney(
    //   user.userAuth.role,
    //   senderBill.amountMoney,
    //   createTransactionDto.amountMoney,
    // );
  }

  async withdraw(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    withdrawDto: WithdrawDto,
  ): Promise<number | any> {}
}
