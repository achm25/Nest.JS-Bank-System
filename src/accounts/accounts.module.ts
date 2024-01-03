import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TransactionsService } from '../transactions/transactions.service';
import { ValidatorService } from '../utils/services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'accounts', schema: UserSchema }]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, ValidatorService, TransactionsService],
})
export class AccountsModule {}
