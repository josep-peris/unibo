import { Global, Module } from '@nestjs/common';
import { JSONPlaceholderService } from './apis/JSONPlaceholder.service';

@Global()
@Module({
  providers: [JSONPlaceholderService],
  exports: [JSONPlaceholderService],
})

export class ApiClientModule {}
