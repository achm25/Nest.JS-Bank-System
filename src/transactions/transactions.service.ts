import { Injectable, Logger } from "@nestjs/common";
import { ValidatorService } from '../utils/services';
import { DepositDto, WithdrawDto } from "./dto";

@Injectable()
export class TransactionsService {
  private readonly _logger = new Logger(TransactionsService.name);
  constructor(private readonly _validatorService: ValidatorService) {}

  async deposit(userId: string, depositDto: DepositDto): Promise<number> {
    this._validatorService.isCorrectRecipient(
      senderBill?.id,
      recipientBill?.id,
    );

    this._validatorService.isCorrectAmountMoney(
      user.userAuth.role,
      senderBill.amountMoney,
      createTransactionDto.amountMoney,
    );
  }

  async withdraw(userId: string, withdrawDto: WithdrawDto): Promise<number | any> {

  }

  async balance(id: string): Promise<number> {}

  async transactionsList(userId: string): Promise<Transaction[]> {}
}
