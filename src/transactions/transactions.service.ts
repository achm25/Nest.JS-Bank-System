import { forwardRef, Inject, Injectable } from "@nestjs/common";
// import { ValidatorService } from '../utils/services';
import { DepositDto, TransferDto, WithdrawDto } from './dto';
import { Model } from 'mongoose';
import { Transaction } from './models/transaction.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users';
import { TransactionStatus, TransactionType } from '../constants';
import { AccountsService } from '../accounts/accounts.service';
import { Account } from '../accounts/models/account.interface';

@Injectable()
export class TransactionsService {
  // private readonly _logger = new Logger(TransactionsService.name);
  constructor(
    @InjectModel('transactions') private transactionModel: Model<Transaction>,
    @Inject(forwardRef(() => AccountsService))
    private readonly _accountsService: AccountsService,
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

  async getAccountTransactionsByPeriod(
    accountId: string,
    fromDate: Date,
    toDate: Date,
  ) {
    const transactions = await this.transactionModel
      .find({
        $or: [{ fromAccountNumber: accountId }, { toAccountNumber: accountId }],
        date: {
          $gte: fromDate,
          $lte: toDate,
        },
      })
      .exec();
    return transactions;
  }

  async transfer(user: User, transferDto: TransferDto) {
    const account = <Account>(
      await this._accountsService.getAccountData(
        user,
        transferDto.fromAccountNumber,
      )
    );

    const toAccount = <Account>(
      await this._accountsService.getAccountData(
        user,
        transferDto.toAccountNumber,
      )
    );

    // this._validatorService.isCorrectAmountMoney(
    //   account.balance,
    //   depositDto.amount,
    // );
    //
    // this._validatorService.isCorrectRecipient(
    //   depositDto.fromAccountNumber,
    //   depositDto.toAccountNumber,
    // );

    try {
      const newTransfer = new this.transactionModel({
        user: user.id,
        date: new Date(),
        fromAccountNumber: transferDto.fromAccountNumber,
        toAccountNumber: transferDto.toAccountNumber,
        status: TransactionStatus.CREATED,
        type: TransactionType.TRANSFER,
        amount: transferDto.amount,
      });

      const savedTransaction = await newTransfer.save();
      await this._accountsService.addAccountTransaction(
        account,
        savedTransaction.id,
      );
      await this._accountsService.updateAccountBalance(
        account,
        -1 * transferDto.amount,
      );
      await this._accountsService.addAccountTransaction(
        toAccount,
        savedTransaction.id,
      );
      await this._accountsService.updateAccountBalance(
        toAccount,
        +1 * transferDto.amount,
      );
      return savedTransaction;
    } catch (error) {
      throw new Error(`Transfer failed: ${error.message}`);
    }
  }

  async withdraw(user: User, withdrawDto: WithdrawDto) {
    const account = <Account>(
      await this._accountsService.getAccountData(
        user,
        withdrawDto.fromAccountNumber,
      )
    );
    try {
      const newWithdraw = new this.transactionModel({
        user: user.id,
        date: new Date(),
        fromAccountNumber: withdrawDto.fromAccountNumber,
        status: TransactionStatus.CREATED,
        type: TransactionType.WITHDRAW,
        amount: withdrawDto.amount,
      });

      const savedTransaction = await newWithdraw.save();
      await this._accountsService.addAccountTransaction(
        account,
        savedTransaction.id,
      );
      await this._accountsService.updateAccountBalance(
        account,
        -1 * withdrawDto.amount,
      );
      await user.save();
      return savedTransaction;
    } catch (error) {
      throw new Error(`Withdraw failed: ${error.message}`);
    }
  }

  async deposit(user: User, depositDto: DepositDto) {
    const account = <Account>(
      await this._accountsService.getAccountData(
        user,
        depositDto.toAccountNumber,
      )
    );

    // this._validatorService.isCorrectAmountMoney(
    //   account.balance,
    //   withdrawDto.amount,
    // );

    try {
      const depositTransaction = new this.transactionModel({
        user: user.id,
        date: new Date(),
        toAccountNumber: depositDto.toAccountNumber,
        status: TransactionStatus.CREATED,
        type: TransactionType.DEPOSIT,
        amount: depositDto.amount,
      });

      const savedTransaction = await depositTransaction.save();
      await this._accountsService.addAccountTransaction(
        account,
        savedTransaction.id,
      );
      await this._accountsService.updateAccountBalance(
        account,
        1 * depositDto.amount,
      );
      await user.save();
      return savedTransaction;
    } catch (error) {
      throw new Error(`deposit failed: ${error.message}`);
    }
  }
}
