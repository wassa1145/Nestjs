export interface NewsDto {
  id: string | number;
  title: string;
  description: string;
  author: string;
  countView?: number;
}

export type NewsCreate = Omit<NewsDto, 'id'>;

export type News = Record<string | number, NewsDto>;
