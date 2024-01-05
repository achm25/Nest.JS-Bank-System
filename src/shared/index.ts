import { Global, Module } from '@nestjs/common';
import { ValidatorService } from '../utils/services';

const providers = [ValidatorService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
