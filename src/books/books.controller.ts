import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Public } from 'src/common/decorators';
import { BooksService } from './books.service';

@Public()
@Controller('api/books')
export class BooksController {
  private logger = new Logger('BooksController');
  constructor(private booksService: BooksService) {}

  @Public()
  @Get('/search')
  getSearchBook(@Query() query): Promise<Observable<AxiosResponse>> {
    this.logger.verbose(`getSearchBook : ${JSON.stringify(query)}`);
    return this.booksService.getSearchBook(query);
  }

  @Public()
  @Get('/search/:id')
  getBookById(@Param('id') id: string): Promise<Observable<AxiosResponse>> {
    this.logger.verbose(`getBookById : ${id}`);
    return this.booksService.getBookById(id);
  }
}
