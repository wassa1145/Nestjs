import { Comment } from './comments/comments.interface';

export interface NewsDto {
  id: number;
  title: string;
  description: string;
  countView?: number;
  cover?: string;
  comments?: Comment[];
}

export type NewsCreate = Omit<NewsDto, 'id'>;

export type News = Record<number, NewsDto>;
