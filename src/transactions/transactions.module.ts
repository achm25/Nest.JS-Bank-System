import { Module, forwardRef } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionSchema } from '../schemas/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from '../accounts/accounts.module';
// import { AccountsService } from '../accounts/accounts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'transactions', schema: TransactionSchema },
    ]),
    forwardRef(() => AccountsModule),
  ],
  controllers: [TransactionsController],
  exports: [TransactionsService],
  providers: [TransactionsService],
})
export class TransactionsModule {}
