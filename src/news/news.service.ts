import { Injectable } from '@nestjs/common';
import { News, NewsCreate, NewsDto } from './news.interface';
import { getRandomInt } from '../utils/utils';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class NewsService {
  constructor(private readonly mailService: MailService) {}
  private readonly news: News = {
    1: {
      id: 1,
      title: 'Название новости',
      description: 'Описание новости',
      author: 'Иван Петрович',
      countView: 12,
      cover: '/static/bfdcebbc-ae5a-4636-a540-1c5a6e9a55f1.jpg',
    },
  };

  getAllNews(): NewsDto[] {
    return Object.values(this.news);
  }

  find(id: number | string): NewsDto | undefined {
    return this.news[id];
  }

  create(news: NewsCreate): NewsDto {
    const newId = getRandomInt(0, 10000);
    const newNews = {
      ...news,
      id: newId,
    };
    this.news[newId] = newNews;
    return newNews;
  }

  remove(id: number) {
    if (this.news[id]) {
      delete this.news[id];
      return true;
    }
    return false;
  }

  edit(id: number | string, news: NewsCreate) {
    const updateNews: Partial<NewsCreate> = Object.keys(news).reduce(
      (acc, key) => {
        if (news[key] !== this.news[id][key]) acc[key] = news[key];
        return acc;
      },
      {},
    );
    if (Object.keys(updateNews).length) {
      this.mailService.sendEditNewsForAdmins(
        ['wassa@li.ru'],
        this.news[id],
        updateNews,
      );
    }
    if (this.news[id]) {
      this.news[id] = {
        ...news,
        id,
        cover: news.cover || this.news[id].cover,
      };
      return true;
    }
    return false;
  }
}
