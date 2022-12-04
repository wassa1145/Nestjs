export interface Comment {
  id?: number | string;
  message: string;
  author: string;
  avatar?: string;
}

export type Comments = Record<string | number, Comment[]>;
