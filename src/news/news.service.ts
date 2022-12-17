import { Injectable } from '@nestjs/common';
import { NewsCreate, NewsDto } from './news.interface';
import { MailService } from '../mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
import { UsersService } from '../user/users.service';
import { CreateNewsDto } from './create.news.dto';

@Injectable()
export class NewsService {
  constructor(
    private readonly mailService: MailService,
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
    private readonly usersService: UsersService,
  ) {}

  getAllNews(): Promise<NewsEntity[]> {
    return this.newsRepository.find({});
  }

  find(id: number): Promise<NewsEntity> {
    return this.newsRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'comments.user'],
    });
    // return this.newsRepository.findOne(
    //   { id },
    //   { relations: ['user', 'comments', 'comments.user'] },
    // );
  }

  async create(news: CreateNewsDto): Promise<NewsEntity> {
    const newsEntity = new NewsEntity();
    newsEntity.title = news.title;
    newsEntity.description = news.description;
    newsEntity.cover = news.cover;
    const _user = await this.usersService.findById(parseInt(news.userId));
    newsEntity.user = _user;
    return await this.newsRepository.save(newsEntity);
  }

  async remove(id: number) {
    const removeNews = await this.find(id);
    if (removeNews) {
      return this.newsRepository.remove(removeNews);
    }
    return null;
  }

  async edit(id: number, news: NewsCreate): Promise<NewsEntity> {
    const editableNews = await this.find(id);
    if (editableNews) {
      const newsEntity = new NewsEntity();
      newsEntity.title = news.title || editableNews.title;
      newsEntity.description = news.description || editableNews.description;
      newsEntity.cover = news.cover || editableNews.cover;
      const savedNews = await this.newsRepository.save(newsEntity);
      if (savedNews) {
        const updateNews = Object.keys(news).reduce((acc, key) => {
          if (news[key] !== editableNews[key]) acc[key] = news[key];
          return acc;
        }, {});
        if (Object.keys(updateNews).length) {
          this.mailService.sendEditNewsForAdmins(
            ['wassa@li.ru'],
            editableNews,
            updateNews,
          );
        }
        return savedNews;
      }
    }
    return null;
  }
}
