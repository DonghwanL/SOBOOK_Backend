import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookShelf } from './book-shelf.model';
import { BookShelfService } from './book-shelf.service';

@Controller('bookShelf')
export class BookShelfController {
  constructor(private bookShelfService: BookShelfService) {}

  @Get()
  getAllBookShelf(): BookShelf[] {
    return this.bookShelfService.getAllBookShelf();
  }

  @Post()
  createBookShelf(@Body() body): BookShelf {
    return this.bookShelfService.createBookShelf(
      body.title,
      body.image,
      body.author,
      body.publisher,
      body.pubdate,
      body.memo,
      body.rating,
    );
  }
}
