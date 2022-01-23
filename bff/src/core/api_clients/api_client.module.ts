import { Global, Module } from '@nestjs/common';
import { ServerService } from './apis/server.service';

@Global()
@Module({
  providers: [ServerService],
  exports: [ServerService],
})

export class ApiClientModule {}
