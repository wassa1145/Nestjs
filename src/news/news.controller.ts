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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoad } from 'src/utils/HelperFileLoad';
import { renderNewsAll } from 'src/view/news/news-all';
import { renderNews } from 'src/view/news/news-detail';
import { renderTemplate } from 'src/view/template';
import { CommentsService } from './comments/comments.service';
import { CreateNewsDto } from './create.news.dto';
import { NewsService } from './news.service';
import { diskStorage } from 'multer';

const PATH_NEWS = '/static/';
HelperFileLoad.path = PATH_NEWS;

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
  ) {}
  @Get()
  getNews() {
    return this.newsService.getAllNews();
  }

  @Get('/all')
  getAllView() {
    const news = this.newsService.getAllNews();
    const content = renderNewsAll(news);
    return renderTemplate(content, {
      title: 'Список новостей',
      description: 'Наши новости',
    });
  }

  @Get('/:id/detail')
  getDetail(@Param('id') id: number | string) {
    const news = this.newsService.find(id);
    const comments = this.commentsService.find(id);

    const item = {
      ...news,
      comments,
    };
    const content = renderNews(item);
    return renderTemplate(content, {
      title: news.title,
      description: 'Детальная страница новости',
    });
  }

  @Get('/:id')
  get(@Param('id') id: number) {
    const news = this.newsService.find(id);
    const comments = this.commentsService.find(id);

    return {
      ...news,
      comments,
    };
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
  create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ) {
    if (cover?.filename) {
      createNewsDto.cover = PATH_NEWS + cover.filename;
    }
    return this.newsService.create(createNewsDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    const isRemoved = this.newsService.remove(id);
    return isRemoved ? 'Новость удалена' : 'Передан неверный id';
  }

  @HttpCode(200)
  @Post('/:id')
  edit(@Param('id') id: number, @Body() news: CreateNewsDto) {
    const isChangeNews = this.newsService.edit(id, news);
    if (isChangeNews) return 'Новость изменена';
    throw new HttpException(
      'Новость не найдена',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
