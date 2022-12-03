import { Comment } from './comments/comments.interface';

export interface NewsDto {
  id: string | number;
  title: string;
  description: string;
  author: string;
  countView?: number;
  cover?: string;
  comments?: Comment[];
}

export type NewsCreate = Omit<NewsDto, 'id'>;

export type News = Record<string | number, NewsDto>;
