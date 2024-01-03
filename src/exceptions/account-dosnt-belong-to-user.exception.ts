import { BadRequestException } from '@nestjs/common';

export class AccountDosntBelongToUserException extends BadRequestException {
  constructor(error?: string) {
    super('error.account_dosnt_belong_to_user', error);
  }
}
