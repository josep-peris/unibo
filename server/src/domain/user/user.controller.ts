import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get('/:id')
  async readUser(@Param('id') id: number): Promise<User> {
    return await this.userService.getUser(id);
  }
  
}
