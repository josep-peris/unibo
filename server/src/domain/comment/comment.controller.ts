import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from '../../entities/comment';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) { }

  @Get('/:id')
  async readComments(@Param('id') id: number): Promise<Comment[]> {
    return await this.commentService.allComments(id);
  }
  
}
