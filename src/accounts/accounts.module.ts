import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
// import { TransactionsModule } from '../transactions/transactions.module';
import { AccountSchema } from '../schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'accounts', schema: AccountSchema }]),
    // forwardRef(() => TransactionsModule),
  ],
  controllers: [AccountsController],
  exports: [AccountsService],
  providers: [AccountsService],
})
export class AccountsModule {}
