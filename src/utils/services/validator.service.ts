import { Injectable } from '@nestjs/common';
import {
  AccountDosntBelongToUserException,
  AmountMoneyNotEnoughException,
  AttemptMakeTransferToMyselfException,
  BillNotFoundException
} from "../../exceptions";
import { User } from '../../users';
import { Account } from "../../accounts/models/account.interface";

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
    senderBillId: string,
    recipientBillId: string,
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
