import { Body, Controller, Get, Logger, Param } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { BooksService } from './books.service';
import { SearchBooksDTO } from './dto/search-books.dto';

@Controller('books')
export class BooksController {
  private logger = new Logger('BooksController');
  constructor(private booksService: BooksService) {}

  @Get('/search')
  getSearchBook(@Body() searchBooksDTO: SearchBooksDTO): Promise<Observable<AxiosResponse>> {
    this.logger.verbose(`getSearchBook : ${JSON.stringify(searchBooksDTO)}`);
    return this.booksService.getSearchBook(searchBooksDTO);
  }

  @Get('/search/:id')
  getBookById(@Param('id') id: string): Promise<Observable<AxiosResponse>> {
    this.logger.verbose(`getBookById : ${id}`);
    return this.booksService.getBookById(id);
  }
}
