import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NewsCreate, NewsDto } from '../news/news.interface';
import { NewsEntity } from '../news/news.entity';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendTest() {
    console.log('Отправляется письмо установки');
    return this.mailerService
      .sendMail({
        to: 'wassa@li.ru',
        subject: 'Первое тестовое письмо',
        template: './test',
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  async sendNewNewsForAdmins(
    emails: string[],
    news: NewsEntity,
  ): Promise<void> {
    console.log('Отправляются письма о новой новости администрации ресурса');
    for (const email of emails) {
      await this.mailerService
        .sendMail({
          to: email,
          subject: `Создана новая новость: ${news.title}`,
          template: './new-news',
          context: news,
        })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }

  async sendEditNewsForAdmins(
    emails: string[],
    news: NewsEntity,
    updateNews: Partial<NewsCreate>,
  ): Promise<void> {
    for (const email of emails) {
      await this.mailerService
        .sendMail({
          to: email,
          subject: `Новость изменена: ${news.title}`,
          template: './edit-news',
          context: { news, updateNews },
        })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
}
