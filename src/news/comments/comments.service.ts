import { Injectable } from '@nestjs/common';
import { getRandomInt } from '../../utils/utils';
import { CommentsCreateDto } from './comments-create.dto';
import { CommentsEditDto } from './comments-edit.dto';
import { Comments, Comment } from './comments.interface';

@Injectable()
export class CommentsService {
  private readonly comments: Comments = {
    1: [
      {
        id: 123,
        message: 'Комментарий к новости',
        author: 'Иван',
      },
    ],
  };

  find(newsId: string | number): Comment[] | null {
    if (this.comments[newsId]) {
      return this.comments[newsId];
    }
    return null;
  }

  create(newsId: string | number, comment: CommentsCreateDto): string {
    const id = getRandomInt(0, 10000);
    if (!this.comments[newsId]) {
      this.comments[newsId] = [];
    }
    this.comments[newsId].push({ id, ...comment });
    return 'Комментарий создан';
  }

  remove(
    newsId: string | number,
    commentId: string | number,
  ): null | Comment[] {
    if (!this.comments[newsId]) return null;
    const indexComment = this.comments[newsId].findIndex(
      (comment) => comment.id === +commentId,
    );

    if (indexComment === -1) return null;

    return this.comments[newsId].splice(indexComment, 1);
  }

  edit(
    newsId: string | number,
    commentId: string | number,
    commentsEditDto: CommentsEditDto,
  ): string {
    if (!this.comments[newsId]) return 'Новость не найдена';
    const indexComment = this.comments[newsId].findIndex(
      (comment) => comment.id === +commentId,
    );

    if (indexComment === -1) return 'Комментарий не найден';
    this.comments[newsId][indexComment] = {
      ...this.comments[newsId][indexComment],
      ...commentsEditDto,
    };
    // this.comments[newsId][indexComment] = { }
    // this.comments[newsId][indexComment].message = message;
    return 'Комментраий отредактирован';
  }
}
