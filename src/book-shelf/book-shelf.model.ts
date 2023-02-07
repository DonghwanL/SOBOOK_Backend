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
}

export enum BookStatus {
  READING = 'READING',
  COMPLETE = 'COMPLETE',
}
