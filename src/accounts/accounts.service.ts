import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './models/account.interface';
import { User } from '../users';
import { ValidatorService } from '../utils/services';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('accounts') private accountModel: Model<Account>,
    private readonly transactionsService: TransactionsService,
    private readonly _validatorService: ValidatorService,
  ) {}

  async getAccountData(user: User, accountId: string) {
    this._validatorService.isAccountBelongsToUser(user, accountId);

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
    this._validatorService.isAccountBelongsToUser(user, accountId);
    const transactions =
      await this.transactionsService.getAccountTransactions(accountId);
    return transactions;
  }
}
