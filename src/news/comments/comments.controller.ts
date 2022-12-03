import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comments.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/:newsId')
  get(@Param('newsId') newsId: string | number) {
    return this.commentsService.find(newsId);
  }

  @Post('/:newsId')
  create(@Param('newsId') newsId: string | number, @Body() comment: Comment) {
    return this.commentsService.create(newsId, comment);
  }

  @Delete('/:newsId/:commentId')
  remove(
    @Param('newsId') newsId: string | number,
    @Param('commentId') commentId: string | number,
  ) {
    return this.commentsService.remove(newsId, commentId);
  }
  @Patch('/:newsId/:commentId')
  edit(
    @Param('newsId') newsId: string | number,
    @Param('commentId') commentId: string | number,
    @Body() message: string,
  ) {
    return this.commentsService.edit(newsId, commentId, message);
  }
}
