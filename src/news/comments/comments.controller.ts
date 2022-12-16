import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsCreateDto } from './comments-create.dto';
import { CommentsEditDto } from './comments-edit.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/:newsId')
  get(@Param('newsId', ParseIntPipe) newsId: number) {
    return this.commentsService.find(newsId);
  }

  @Post('/:newsId')
  create(
    @Param('newsId', ParseIntPipe) newsId: number,
    @Body() comment: CommentsCreateDto,
  ) {
    return this.commentsService.create(newsId, comment);
  }

  @Delete('/:newsId/:commentId')
  remove(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentsService.remove(commentId);
  }
  @Patch('/:commentId')
  edit(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() commentsEditDto: CommentsEditDto,
  ) {
    return this.commentsService.edit(commentId, commentsEditDto);
  }
}
