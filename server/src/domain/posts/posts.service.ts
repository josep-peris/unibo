import { Inject, Injectable, Logger } from '@nestjs/common';
import { GenericException } from '../../core/api_error/exceptions';
import { JSONPlaceholderService } from '../../core/api_clients/apis/JSONPlaceholder.service';
import { Posts } from '../../entities/post';

@Injectable()
export class PostsService {

  constructor(
    @Inject(JSONPlaceholderService) private readonly apiClientService: JSONPlaceholderService,
  ) {  }

  async allPosts(): Promise<Posts[]> {
    return await this.apiClientService.listPost()
      .catch((err) => {
        Logger.error(err.stack);
        throw new GenericException('PostsService.all', err.message);
      });
  }

  async getPost(id: number): Promise<Posts> {
    return await this.apiClientService.getPost(id)
      .catch((err) => {
        Logger.error(err.stack);
        throw new GenericException('PostsService.getPost', err.message);
      });
  }

  async updatePost(id: number, body: Posts): Promise<Posts> {
    const post: Posts = new Posts(body);

    return await this.apiClientService.updatePost(id, body)
      .catch((err) => {
        Logger.error(err.stack);
        throw new GenericException('PostsService.create', err.message);
      });
  }

  async createPost(body: Posts): Promise<Posts> {
    const post: Posts = new Posts(body);
    
    return await this.apiClientService.createPost(post)
      .catch((err) => {
        Logger.error(err.stack);
        throw new GenericException('PostsService.create', err.message);
      });
  }
  
}
