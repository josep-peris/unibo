import {
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { Environment } from './environment.enum';
  
  export class EnvironmentVariables {
  
    @IsNumber()
    PORT: number;
  
    @IsString()
    APP_SERVER: string;
  
    @IsEnum(Environment)
    @IsOptional()
    APP_ENV: Environment = Environment.Development;
  
  }
  