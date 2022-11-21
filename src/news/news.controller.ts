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
} from '@nestjs/common';
import { CreateNewsDto } from './create.news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getNews() {
    return this.newsService.getAllNews();
  }

  @Get('/:id')
  get(@Param('id') id: number) {
    return this.newsService.find(id);
  }

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
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
