import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BookShelf, BookStatus } from './book-shelf.model';
import { BookShelfService } from './book-shelf.service';
import { CreateBookShelfDto } from './dto/create-bookShelf.dto';
import { BookStatusValidationPipe } from './pipe/book-status-validation.pipe';

@Controller('bookShelf')
export class BookShelfController {
  constructor(private readonly bookShelfService: BookShelfService) {}

  @Get()
  getAllBookShelf(): BookShelf[] {
    return this.bookShelfService.getAllBookShelf();
  }

  @Post()
  createBookShelf(@Body() createBookShelfDto: CreateBookShelfDto) {
    return this.bookShelfService.createBookShelf(createBookShelfDto);
  }

  @Get('/:id')
  getBookShelfById(@Param('id') id: string): BookShelf {
    return this.bookShelfService.getBookShelfById(id);
  }

  @Delete('/:id')
  deleteBookShelf(@Param('id') id: string): void {
    this.bookShelfService.deleteBookShelf(id);
  }

  @Patch('/:id/status')
  updateBookStatus(@Param('id') id: string, @Body('status', BookStatusValidationPipe) status: BookStatus) {
    return this.bookShelfService.updateBookStatus(id, status);
  }
}
