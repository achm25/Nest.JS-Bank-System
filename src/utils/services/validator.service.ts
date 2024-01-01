import { Injectable } from '@nestjs/common';
import {
  AmountMoneyNotEnoughException,
  AttemptMakeTransferToMyselfException,
  BillNotFoundException,
} from '../../exceptions';

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

  public isCorrectRecipient(
    senderBillId: number,
    recipientBillId: number,
  ): boolean {
    if (!senderBillId || !recipientBillId) {
      throw new BillNotFoundException();
    }

    if (senderBillId === recipientBillId) {
      throw new AttemptMakeTransferToMyselfException();
    }

    return true;
  }
}
