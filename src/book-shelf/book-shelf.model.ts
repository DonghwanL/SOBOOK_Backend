export interface BookShelf {
  id: string;
  title: string;
  image: string;
  author: string;
  publisher: string;
  pubdate: string;
  memo?: string;
  status: BookStatus;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum BookStatus {
  READING = 'READING',
  COMPLETE = 'COMPLETE',
}
