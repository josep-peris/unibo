import { Injectable } from '@nestjs/common';
import { ConfigurationService } from '../../configuration/configuration.service';
import { BaseApiClient } from './base.api_client';
import { GenericException } from '../../api_error/exceptions';

@Injectable()
export class ServerService extends BaseApiClient {
  private postEndpoint = 'posts';
  private userEndpoint = 'user';
  private commentsEndpoint = 'comments';
  
  constructor(
    protected config: ConfigurationService,
  ) {
    super(config.APP_SERVER);
  }

  async getPost(id: number) {
    return await this.get(`${this.postEndpoint}/${id}`, 'json')
      .catch( (err) => {
        throw new GenericException('ApiClientService.getPost', `No se ha encontrado el Post "${id}".`, err);
      });
  }

  async getComments(id: number) {
    return await this.get(`${this.commentsEndpoint}/${id}`, 'json')
      .catch( (err) => {
        throw new GenericException('ApiClientService.getComments', `No se ha encontrado commentarios del post "${id}".`, err);
      });
  }

  async getUser(id: number) {
    return await this.get(`${this.userEndpoint}/${id}`, 'json')
      .catch( (err) => {
        throw new GenericException('ApiClientService.getUser', `No se ha encontrado el usuario "${id}".`, err);
      });
  }

}