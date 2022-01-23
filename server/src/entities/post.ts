import { ApiBaseEntity } from '../core/dto/app_base.entity';
import { IsString, IsNumber } from 'class-validator';

export class Posts extends ApiBaseEntity<Posts> {
  
  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;

  @IsString()
  title: string;

  @IsString()
  body: string;

}