import { Injectable } from '@nestjs/common';
import { Book } from './book.model';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  getAllBookShelf(): Book[] {
    return this.books;
  }
}
