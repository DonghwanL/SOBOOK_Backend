import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BookShelfService } from './book-shelf.service';
import { CreateBookShelfDto } from './dto/create-bookShelf.dto';
import { BookShelf } from './entity/book-shelf.entity';
import { UpdateBookShelfDto } from './dto/update-bookShelf.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/entity/user.entity';

@Controller('bookShelf')
@UseGuards(AuthGuard())
export class BookShelfController {
  private logger = new Logger('BookShelfController');
  constructor(private readonly bookShelfService: BookShelfService) {}

  @Get()
  getAllBookShelf(@GetUser() user: User): Promise<BookShelf[]> {
    this.logger.verbose(`getAllBookShelf: ${user.email}`);
    return this.bookShelfService.getAllBookShelf(user);
  }

  @Get('/:id')
  getBookShelfById(@Param('id') id: number): Promise<BookShelf> {
    this.logger.verbose(`getBookShelfById : ${id}`);
    return this.bookShelfService.getBookShelfById(id);
  }

  @Post()
  createBookShelf(@Body() createBookShelfDto: CreateBookShelfDto, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`createBookShelf: ${JSON.stringify(createBookShelfDto)}`);
    return this.bookShelfService.createBookShelf(createBookShelfDto, user);
  }

  @Patch('/:id')
  updateBookShelf(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookShelfDto: UpdateBookShelfDto,
    @GetUser() user: User,
  ): Promise<BookShelf> {
    this.logger.verbose(`updateBookShelf : ${id}`);
    return this.bookShelfService.updateBookShelf(id, user, updateBookShelfDto);
  }

  @Delete('/:id')
  deleteBookShelf(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`deleteBookShelf : ${id}`);
    return this.bookShelfService.deleteBookShelf(id, user);
  }
}
