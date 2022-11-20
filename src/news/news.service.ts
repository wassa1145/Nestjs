import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './create.news.dto';
import { News, NewsCreate, NewsDto } from './news.interface';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}
@Injectable()
export class NewsService {
  private readonly news: News = {
    1: {
      id: 1,
      title: 'Название новости',
      description: 'Описание новости',
      author: 'Иван Петрович',
      countView: 12,
    },
  };

  getAllNews(): CreateNewsDto[] {
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
    if (this.news[id]) {
      this.news[id] = { ...news, id };
      return true;
    }
    return false;
  }
}
