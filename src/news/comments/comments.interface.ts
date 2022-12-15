export interface Comment {
  id?: number | string;
  message: string;
}

export type Comments = Record<string | number, Comment[]>;
