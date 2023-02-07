import { Injectable } from '@nestjs/common';
import { BookShelf, BookStatus } from './book-shelf.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BookShelfService {
  private bookShelf: BookShelf[] = [];

  getAllBookShelf(): BookShelf[] {
    return this.bookShelf;
  }

  createBookShelf(
    title: string,
    image: string,
    author: string,
    publisher: string,
    pubdate: string,
    memo: string,
    rating: number,
  ) {
    const bookShelf: BookShelf = {
      id: uuid(),
      title,
      image,
      author,
      publisher,
      pubdate,
      memo,
      rating,
      status: BookStatus.READING,
    };

    this.bookShelf.push(bookShelf);
    return bookShelf;
  }
}
