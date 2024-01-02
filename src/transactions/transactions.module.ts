import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionSchema } from '../schemas/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidatorService } from '../utils/services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'transactions', schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, ValidatorService],
})
export class TransactionModule {}
