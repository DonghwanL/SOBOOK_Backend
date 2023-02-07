import { Controller, Get } from '@nestjs/common';
import { Book } from './book.model';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBookShelf(): Book[] {
    return this.booksService.getAllBookShelf();
  }
}
