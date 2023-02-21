import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BookShelfService } from './book-shelf.service';
import { CreateBookShelfDTO } from './dto/create-bookShelf.dto';
import { BookShelf } from './entity/book-shelf.entity';
import { UpdateBookShelfDTO } from './dto/update-bookShelf.dto';
import { GetCurrentUser } from 'src/common/decorators/get-current-user-decorator';
import { User } from 'src/user/entity/user.entity';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('api/bookShelf')
export class BookShelfController {
  private logger = new Logger('BookShelfController');
  constructor(private readonly bookShelfService: BookShelfService) {}

  @Get()
  getAllBookShelf(@GetCurrentUserId() userId: number): Promise<BookShelf[]> {
    this.logger.verbose(`getAllBookShelf: ${userId}`);
    return this.bookShelfService.getAllBookShelf(userId);
  }

  @Get('/:id')
  getBookShelfById(@Param('id', ParseIntPipe) id: number): Promise<BookShelf> {
    this.logger.verbose(`getBookShelfById : ${id}`);
    return this.bookShelfService.getBookShelfById(id);
  }

  @Post()
  createBookShelf(@Body() createBookShelfDTO: CreateBookShelfDTO, @GetCurrentUser() user: User): Promise<void> {
    this.logger.verbose(`createBookShelf: ${JSON.stringify(createBookShelfDTO)}`);
    return this.bookShelfService.createBookShelf(createBookShelfDTO, user);
  }

  @Patch('/status/:id')
  updateBookState(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookShelfDTO: UpdateBookShelfDTO,
    @GetCurrentUser() user: User,
  ): Promise<BookShelf> {
    this.logger.verbose(`updateBookState : ${id}`);
    return this.bookShelfService.updateBookState(id, user, updateBookShelfDTO);
  }

  @Patch('/contents/:id')
  updateBookContents(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookShelfDTO: UpdateBookShelfDTO,
    @GetCurrentUser() user: User,
  ): Promise<BookShelf> {
    this.logger.verbose(`updateBookContents : ${id}`);
    return this.bookShelfService.updateBookContents(id, user, updateBookShelfDTO);
  }

  @Delete('/:id')
  deleteBookShelf(@Param('id', ParseIntPipe) id: number, @GetCurrentUser() user: User): Promise<void> {
    this.logger.verbose(`deleteBookShelf : ${id}`);
    return this.bookShelfService.deleteBookShelf(id, user);
  }
}
