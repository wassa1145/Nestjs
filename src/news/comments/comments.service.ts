import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { getRandomInt } from '../../utils/utils';
import { CommentsCreateDto } from './comments-create.dto';
import { CommentsEditDto } from './comments-edit.dto';
import { Comments, Comment } from './comments.interface';
import { CommentsEntity } from './comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsService } from '../news.service';
import { UsersService } from '../../user/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
    private readonly newsService: NewsService,
    private readonly userService: UsersService,
  ) {}

  // find({where: {client: clientId, companyRelationType: 2}, relations:['responsible']})

  async find(newsId: number): Promise<CommentsEntity[]> {
    return this.commentsRepository.find({
      where: {
        news: {
          id: newsId,
        },
      },
      relations: ['user'],
    });
  }
  async create(
    newsId: number,
    comment: CommentsCreateDto,
  ): Promise<CommentsEntity> {
    const _news = await this.newsService.find(newsId);
    if (!_news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const _user = await this.userService.findById(comment.userId);
    if (!_user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Пользователь не найден',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const commentEntity = new CommentsEntity();
    commentEntity.news = _news;
    commentEntity.user = _user;
    commentEntity.message = comment.message;

    return this.commentsRepository.save(commentEntity);
  }

  async edit(
    commentId: number,
    comment: CommentsEditDto,
  ): Promise<CommentsEntity> {
    const _comment = await this.commentsRepository.findOne({
      where: { id: commentId },
      relations: ['news', 'user'],
    });
    _comment.message = comment.message;
    return this.commentsRepository.save(_comment);
  }

  async remove(id: number): Promise<CommentsEntity> {
    const _comment = await this.commentsRepository.findOneBy({ id });
    if (!_comment) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Комменетарий не найден',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.commentsRepository.remove(_comment);
  }

  async removeAll(newsId) {
    const _comments = await this.find(newsId);
    return await this.commentsRepository.remove(_comments);
  }
}
