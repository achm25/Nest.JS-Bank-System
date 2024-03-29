import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './models/account.interface';
import { User } from '../users';
import { ValidatorService } from '../utils/services';
import { Transaction } from '../transactions/models/transaction.interface';
import { UserService } from '../users/users.service';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('accounts') private accountModel: Model<Account>,
    private readonly _validatorService: ValidatorService,
    private readonly _userService: UserService,
    @Inject(forwardRef(() => TransactionsService))
    private readonly _transactionsService: TransactionsService,
  ) {}

  async getAccountData(user: User, accountId: string) {
    try {
      const account = await this.accountModel.findById(accountId).exec();
      return account;
    } catch (error) {
      throw new Error(` Error Finding Account: ${error.message}`);
    }
  }

  async getAccountBalance(user: User, accountId: string) {
    const account = <Account>await this.getAccountData(user, accountId);
    return account.balance;
  }

  async getAccountTransactions(user: User, accountId: string) {
    const transactions =
      await this._transactionsService.getAccountTransactions(accountId);
    return transactions;
  }

  async getAccountStatement(accountId: string, fromDate: Date, toDate: Date) {
    const transactions =
      await this._transactionsService.getAccountTransactionsByPeriod(
        accountId,
        fromDate,
        toDate,
      );
    return transactions;
  }

  async updateAccountBalance(account: Account, amount: number) {
    account.balance += amount;
    await account.save();
  }

  async addAccountTransaction(account: Account, transaction: Transaction) {
    account.transactions.push(transaction.id);
  }

  async createAccount(userId: string) {
    try {
      const newAccount = new this.accountModel({
        registerDate: new Date(),
      });
      if (!newAccount) {
        throw new Error('Account Creation Failed!');
      }

      await this._userService.addAccount(userId, newAccount.id);
      const res = await newAccount.save();
      return res;
    } catch (e) {
      throw new Error(`Error adding account: ${e.message}`);
    }
  }

  async deleteAccount(userId: string, accountId: string) {
    try {
      const res = await this.accountModel.findByIdAndDelete(accountId).exec();
      await this._userService.removeAccount(userId, accountId);
      return res;
    } catch (e) {
      throw new Error(`Error deleting account: ${e.message}`);
    }
  }
}
