import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TransactionsModule } from '../transactions/transactions.module';
import { AccountSchema } from '../schemas/account.schema';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'accounts', schema: AccountSchema }]),
    UserModule,
    forwardRef(() => TransactionsModule),
  ],
  controllers: [AccountsController],
  exports: [AccountsService],
  providers: [AccountsService],
})
export class AccountsModule {}
