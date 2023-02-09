import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BookShelfService } from './book-shelf.service';
import { CreateBookShelfDto } from './dto/create-bookShelf.dto';
import { BookShelf } from './entity/book-shelf.entity';
import { UpdateBookShelfDto } from './dto/update-bookShelf.dto';

@Controller('bookShelf')
export class BookShelfController {
  constructor(private readonly bookShelfService: BookShelfService) {}

  @Get()
  getAllBookShelf(): Promise<BookShelf[]> {
    return this.bookShelfService.getAllBookShelf();
  }

  @Get('/:id')
  getBookShelfById(@Param('id') id: number): Promise<BookShelf> {
    return this.bookShelfService.getBookShelfById(id);
  }

  @Post()
  createBookShelf(@Body() createBookShelfDto: CreateBookShelfDto): Promise<BookShelf> {
    return this.bookShelfService.createBookShelf(createBookShelfDto);
  }

  @Patch('/:id')
  updateBookShelf(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookShelfDto: UpdateBookShelfDto,
  ): Promise<BookShelf> {
    return this.bookShelfService.updateBookShelf(id, updateBookShelfDto);
  }

  @Delete('/:id')
  deleteBookShelf(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.bookShelfService.deleteBookShelf(id);
  }
}
