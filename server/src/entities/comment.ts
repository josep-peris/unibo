import { ApiBaseEntity } from '../core/dto/app_base.entity';
import { IsString, IsNumber } from 'class-validator';

export class Comment extends ApiBaseEntity<Comment> {
  
  @IsNumber()
  id: number;

  @IsNumber()
  postId: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  body: string;

}