import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { BookShelfModule } from './book-shelf/book-shelf.module';

@Module({
  imports: [BooksModule, BookShelfModule],
})
export class AppModule {}
