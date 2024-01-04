import { Injectable, Logger } from '@nestjs/common';
import { ValidatorService } from '../utils/services';
import { DepositDto, WithdrawDto } from './dto';
import { Model } from 'mongoose';
import { Transaction } from './models/transaction.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users';
import { TransactionStatus, TransactionType } from '../constants';
import { AccountsService } from '../accounts/accounts.service';
import { Account } from '../accounts/models/account.interface';

@Injectable()
export class TransactionsService {
  private readonly _logger = new Logger(TransactionsService.name);
  constructor(
    @InjectModel('transactions')
    private transactionModel: Model<Transaction>,
    private readonly _validatorService: ValidatorService,
    private readonly accountsService: AccountsService,
  ) {}

  async getTransactionData(transactionId: string) {
    try {
      const transaction = await this.transactionModel
        .findById(transactionId)
        .exec();
      return transaction;
    } catch (error) {
      throw new Error(` Error Finding Transaction: ${error.message}`);
    }
  }

  async getUserTransactions(userId: string) {
    const transactions = await this.transactionModel
      .find({ user: userId })
      .exec();
    return transactions;
  }

  async getAccountTransactions(accountId: string) {
    const transactions = await this.transactionModel
      .find({
        $or: [{ fromAccountNumber: accountId }, { toAccountNumber: accountId }],
      })
      .exec();
    return transactions;
  }

  async deposit(user: User, depositDto: DepositDto) {
    this._validatorService.isAccountBelongsToUser(
      user,
      depositDto.fromAccountNumber,
    );

    const account = <Account>(
      await this.accountsService.getAccountData(
        user,
        depositDto.fromAccountNumber,
      )
    );

    const toAccount = <Account>(
      await this.accountsService.getAccountData(
        user,
        depositDto.toAccountNumber,
      )
    );

    this._validatorService.isCorrectAmountMoney(
      account.balance,
      depositDto.amount,
    );

    this._validatorService.isCorrectRecipient(
      depositDto.fromAccountNumber,
      depositDto.toAccountNumber,
    );

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
      await this.accountsService.addAccountTransaction(
        account,
        savedTransaction.id,
      );
      await this.accountsService.updateAccountBalance(
        account,
        -1 * depositDto.amount,
      );
      await this.accountsService.addAccountTransaction(
        toAccount,
        savedTransaction.id,
      );
      await this.accountsService.updateAccountBalance(
        toAccount,
        +1 * depositDto.amount,
      );
      return savedTransaction;
    } catch (error) {
      throw new Error(`Deposit failed: ${error.message}`);
    }
  }

  async withdraw(user: User, withdrawDto: WithdrawDto) {
    this._validatorService.isAccountBelongsToUser(
      user,
      withdrawDto.fromAccountNumber,
    );

    const account = <Account>(
      await this.accountsService.getAccountData(
        user,
        withdrawDto.fromAccountNumber,
      )
    );

    this._validatorService.isCorrectAmountMoney(
      account.balance,
      withdrawDto.amount,
    );

    try {
      const depositTransaction = new this.transactionModel({
        user: user.id,
        date: new Date(),
        fromAccountNumber: withdrawDto.fromAccountNumber,
        status: TransactionStatus.CREATED,
        type: TransactionType.WITHDRAW,
        amount: withdrawDto.amount,
      });

      const savedTransaction = await depositTransaction.save();
      await this.accountsService.addAccountTransaction(
        account,
        savedTransaction.id,
      );
      await this.accountsService.updateAccountBalance(
        account,
        -1 * withdrawDto.amount,
      );
      await user.save();
      return savedTransaction;
    } catch (error) {
      throw new Error(`Withdraw failed: ${error.message}`);
    }
  }
}
