import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { ValidatorService } from '../utils/services';
import { TransactionModule } from '../transactions/transactions.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'accounts', schema: UserSchema }]),
    TransactionModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService, ValidatorService],
})
export class AccountsModule {}
