import { v1 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { BookShelf, BookStatus } from './book-shelf.model';
import { CreateBookShelfDto } from './dto/create-bookShelf.dto';

@Injectable()
export class BookShelfService {
  private bookShelf: BookShelf[] = [];

  getAllBookShelf(): BookShelf[] {
    return this.bookShelf;
  }

  createBookShelf(createBookShelfDto: CreateBookShelfDto) {
    const { title, image, author, publisher, pubdate, memo, rating } = createBookShelfDto;

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

  getBookShelfById(id: string): BookShelf {
    return this.bookShelf.find((book) => book.id === id);
  }

  deleteBookShelf(id: string): void {
    this.bookShelf = this.bookShelf.filter((book) => book.id !== id);
  }

  updateBookStatus(id: string, status: BookStatus): BookShelf {
    const bookShelf = this.getBookShelfById(id);
    bookShelf.status = status;
    return bookShelf;
  }
}
