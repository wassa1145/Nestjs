import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoad } from '../utils/HelperFileLoad';
import { CommentsService } from './comments/comments.service';
import { CreateNewsDto } from './create.news.dto';
import { NewsService } from './news.service';
import { diskStorage } from 'multer';
import { MailService } from '../mail/mail.service';
import { NewsDto } from './news.interface';
import { NewsEntity } from './news.entity';

const PATH_NEWS = '/static/';
HelperFileLoad.path = PATH_NEWS;

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  async getNews(): Promise<NewsEntity[]> {
    return await this.newsService.getAllNews();
  }

  @Get('/all')
  @Render('news-list')
  async getAllView() {
    const news = await this.newsService.getAllNews();
    return { news, title: 'Список новостей' };
  }

  @Get('create/new')
  @Render('create-news')
  async createView() {
    return {};
  }

  @Get('edit/:id')
  @Render('edit-news')
  async editNews(@Param('id') id: number) {
    const news = await this.newsService.find(id);
    return { ...news };
  }

  @Get('/:id/detail')
  @Render('news-detail')
  async getDetail(@Param('id') id: number) {
    const news = await this.newsService.find(id);
    if (news) return news;
    else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('/:id')
  async get(@Param('id') id: number) {
    return await this.newsService.find(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoad.destinationPath,
        filename: HelperFileLoad.customFileName,
      }),
      fileFilter: HelperFileLoad.typeFileFilter,
    }),
  )
  async create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ): Promise<NewsEntity> {
    if (cover?.filename) {
      createNewsDto.cover = PATH_NEWS + cover.filename;
    }
    const news = await this.newsService.create(createNewsDto);
    this.mailService.sendNewNewsForAdmins(['wassa@li.ru'], news);
    return news;
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    const isRemoved = await this.newsService.remove(id);
    return isRemoved ? 'Новость удалена' : 'Передан неверный id';
  }

  @HttpCode(200)
  @Post('/:id')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoad.destinationPath,
        filename: HelperFileLoad.customFileName,
      }),
      fileFilter: HelperFileLoad.typeFileFilter,
    }),
  )
  async edit(
    @Param('id') id: number,
    @Body() news: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ) {
    if (cover?.filename) {
      news.cover = PATH_NEWS + cover.filename;
    }
    const isChangeNews = await this.newsService.edit(id, news);
    if (isChangeNews) return 'Новость изменена';
    throw new HttpException(
      'Новость не найдена',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
