import { Controller, Req, Get, Post, Body, Param, Next, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from '../../entities/post';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
  ) { }

  @Get('/:id')
  async readPost(@Param('id') id: number) {
    return await this.postsService.getPost(id);
  }

  @Get('/')
  async postsList() {
    return await this.postsService.allPosts();
  }

  @Post('/create')
  async createPost(@Body() body: Posts) {
    return await this.postsService.createPost(body);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: Posts) {
    return await this.postsService.updatePost(id, body);
  }

}
