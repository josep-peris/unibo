import { ApiBaseEntity } from '../core/dto/app_base.entity';
import { IsString, IsNumber } from 'class-validator';

export class User extends ApiBaseEntity<User> {
  
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  website: string;

}