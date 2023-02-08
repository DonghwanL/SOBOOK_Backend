import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BookStatus } from './book-status.enum';
import { BookShelfService } from './book-shelf.service';
import { CreateBookShelfDto } from './dto/create-bookShelf.dto';
import { BookShelf } from './entity/book-shelf.entity';
import { BookStatusValidationPipe } from './pipe/book-status-validation.pipe';
import { UpdateBookShelfDto } from './dto/update-bookShelf.dto';

@Controller('bookShelf')
export class BookShelfController {
  constructor(private readonly bookShelfService: BookShelfService) {}

  @Get()
  getAllBookShelf(): Promise<BookShelf[]> {
    return this.bookShelfService.getAllBookShelf();
  }

  @Post()
  createBookShelf(@Body() createBookShelfDto: CreateBookShelfDto): Promise<BookShelf> {
    return this.bookShelfService.createBookShelf(createBookShelfDto);
  }

  @Get('/:id')
  getBookShelfById(@Param('id') id: number): Promise<BookShelf> {
    return this.bookShelfService.getBookShelfById(id);
  }

  @Delete('/:id')
  deleteBookShelf(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.bookShelfService.deleteBookShelf(id);
  }

  @Patch('/:id')
  updateBookShelf(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookShelfDto: UpdateBookShelfDto,
  ): Promise<BookShelf> {
    return this.bookShelfService.updateBookShelf(id, updateBookShelfDto);
  }
}
