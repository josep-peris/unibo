import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigurationModule } from '../core/configuration/configuration.module';
import { ApiErrorFilter } from '../core/api_error/api_error.filter';
import { ApiClientModule } from '../core/api_clients/api_client.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigurationModule,
    ApiClientModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ApiErrorFilter,
    }
  ],
})
export class AppModule {}
