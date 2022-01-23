import { Inject, Injectable, Logger } from '@nestjs/common';
import { GenericException } from '../../core/api_error/exceptions';
import { JSONPlaceholderService } from '../../core/api_clients/apis/JSONPlaceholder.service';
import { User } from '../../entities/user';

@Injectable()
export class UserService {

  constructor(
    @Inject(JSONPlaceholderService) private readonly apiClientService: JSONPlaceholderService,
  ) {  }

  async getUser(id: number): Promise<User> {
    return await this.apiClientService.getUser(id)
      .catch((err) => {
        Logger.error(err.stack);
        throw new GenericException('UserService.getUser', err.message);
      });
  }

}
