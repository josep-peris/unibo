import { Inject, Injectable, Logger } from '@nestjs/common';
import { GenericException } from '../../core/api_error/exceptions';
import { JSONPlaceholderService } from '../../core/api_clients/apis/JSONPlaceholder.service';
import { Comment } from '../../entities/comment';

@Injectable()
export class CommentService {

  constructor(
    @Inject(JSONPlaceholderService) private readonly apiClientService: JSONPlaceholderService,
  ) {  }

  async allComments(idPost: number): Promise<Comment[]> {
    return await this.apiClientService.listComments(idPost)
      .catch((err) => {
        Logger.error(err.stack);
        throw new GenericException('CommentService.allComments', err.message);
      });
  }
}
