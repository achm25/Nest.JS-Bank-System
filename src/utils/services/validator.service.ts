import { Injectable } from '@nestjs/common';
import { AmountMoneyNotEnoughException } from '../../exceptions';

@Injectable()
export class ValidatorService {
  public isCorrectAmountMoney(
    senderAmountMoney: string | number,
    transactionAmountMoney: string | number,
  ): boolean {
    if (Number(transactionAmountMoney) <= 0) {
      throw new AmountMoneyNotEnoughException();
    }

    if (Number(senderAmountMoney) < Number(transactionAmountMoney)) {
      throw new AmountMoneyNotEnoughException();
    }

    return true;
  }
}
