import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../../configuration/configuration.service';
import { BaseApiClient } from './base.api_client';
import { GenericException } from '../../api_error/exceptions';
import { Posts } from '../../../entities/post';
import { Comment } from '../../../entities/comment';
import { User } from '../../../entities/user';

@Injectable()
export class JSONPlaceholderService extends BaseApiClient {
  private postEndpoint = 'posts';
  private commentsEndpoint = 'comments';
  private usersEndpoint = 'users';
  
  constructor(
    protected config: ConfigurationService,
  ) {
    super(config.APP_JSONP);
  }

  async listPost(): Promise<Posts[]> {
    return await this.get<Posts[]>(`${this.postEndpoint}`, 'json')
      .catch( (err) => {
        throw new GenericException('ApiClientService.listPost', `Imposible leer la lista de Posts.`, err);
      });
  }

  async getPost(id: number): Promise<Posts> {
    return await this.get<Posts>(`${this.postEndpoint}/${id}`, 'json')
      .catch( (err) => {
        throw new GenericException('ApiClientService.getPost', `No se ha encontrado el Post "${id}".`, err);
      });
  }

  async createPost(body: Posts): Promise<Posts> {
    return await this.post<Posts>(this.postEndpoint, body, 'json')
      .catch( (err) => {
        throw new GenericException('ApiClientService.createPost', `Imposible crear un Post'.`, err);
      });
  }

  async updatePost(id: number, body: Posts): Promise<Posts> {
    return await this.post<Posts>(`${this.postEndpoint}/${id}`, body, 'json')
      .catch( (err) => {
        throw new GenericException('ApiClientService.createPost', `Imposible actualizar el Post ${id}'.`, err);
      });
  }

  async listComments(idPost: number): Promise<Comment[]> {
    return await this.get<Comment[]>(`${this.postEndpoint}/${idPost}/${this.commentsEndpoint}`, 'json')
      .catch( (err) => {
        throw new GenericException('ApiClientService.listPost', `Imposible encontrar los comentarios del Post "{id}.`, err);
      });
  }

  async getUser(id: number): Promise<User> {
    return this.get<User>(`${this.usersEndpoint}/${id}`, 'json')
      .catch( (err) => {
        throw new GenericException('ApiClientService.getUser', `Imposible encontrar el Usuario ${id}.`, err);
      });
  }
}
