export interface Book {
  id: string;
  title: string;
  description: string;
  discount: string;
  link: string;
  isbn: string;
  image: string;
  author: string;
  publisher: string;
  pubdate: string;
  memo: string;
  status: BookStatus;
  rating: number;
}

export enum BookStatus {
  READING = 'READING',
  COMPLETE = 'COMPLETE',
}
