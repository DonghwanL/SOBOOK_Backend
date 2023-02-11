import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  private logger = new Logger('BooksController');
  constructor(private booksService: BooksService) {}

  @Get('/search')
  getSearchBook(@Query() query): Promise<Observable<AxiosResponse>> {
    this.logger.verbose(`getSearchBook : ${JSON.stringify(query)}`);
    return this.booksService.getSearchBook(query);
  }

  @Get('/search/:id')
  getBookById(@Param('id') id: string): Promise<Observable<AxiosResponse>> {
    this.logger.verbose(`getBookById : ${id}`);
    return this.booksService.getBookById(id);
  }
}
