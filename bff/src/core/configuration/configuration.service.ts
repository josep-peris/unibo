import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './environment.enum';

@Injectable()
export class ConfigurationService {
  constructor(private readonly config?: ConfigService) {}

  // #region  Required Variables
  get PORT(): number {
    return this.config.get('PORT');
  }

  get APP_ENV(): Environment.Development {
    return this.config.get('APP_ENV');
  }

  get APP_SERVER(): string {
    return this.config.get('APP_SERVER');
  }

  get APP_NAME(): string {
    return this.config.get('APP_NAME');
  }

}
