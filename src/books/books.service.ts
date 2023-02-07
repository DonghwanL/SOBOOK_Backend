import { Injectable } from '@nestjs/common';
import { Book } from './book.model';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  getAllBooks(): Book[] {
    return this.books;
  }
}
