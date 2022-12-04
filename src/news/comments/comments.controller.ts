import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsCreateDto } from './comments-create.dto';
import { CommentsEditDto } from './comments-edit.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoad } from 'src/utils/HelperFileLoad';

const PATH_NEWS = '/static/';
HelperFileLoad.path = PATH_NEWS;

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/:newsId')
  get(@Param('newsId') newsId: string | number) {
    return this.commentsService.find(newsId);
  }

  @Post('/:newsId')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: HelperFileLoad.destinationPath,
        filename: HelperFileLoad.customFileName,
      }),
      fileFilter: HelperFileLoad.typeFileFilter,
    }),
  )
  create(
    @Param('newsId') newsId: string | number,
    @Body() comment: CommentsCreateDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    if (avatar?.filename) {
      comment.avatar = PATH_NEWS + avatar.filename;
    }
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
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: HelperFileLoad.destinationPath,
        filename: HelperFileLoad.customFileName,
      }),
      fileFilter: HelperFileLoad.typeFileFilter,
    }),
  )
  edit(
    @Param('newsId') newsId: string | number,
    @Param('commentId') commentId: string | number,
    @Body() commentsEditDto: CommentsEditDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    if (avatar?.filename) {
      commentsEditDto.avatar = PATH_NEWS + avatar.filename;
    }
    return this.commentsService.edit(newsId, commentId, commentsEditDto);
  }
}
