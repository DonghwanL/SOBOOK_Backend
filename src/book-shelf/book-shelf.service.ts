import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookShelf } from './entity/book-shelf.entity';
import { BookShelfRepository } from './repository/book-shelf.repository';
import { CreateBookShelfDto } from './dto/create-bookShelf.dto';
import { UpdateBookShelfDto } from './dto/update-bookShelf.dto';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class BookShelfService {
  constructor(
    @InjectRepository(BookShelfRepository)
    private bookShelfRepository: BookShelfRepository,
  ) {}

  getAllBookShelf(): Promise<BookShelf[]> {
    return this.bookShelfRepository.getAllBookShelf();
  }

  getBookShelfById(id: number): Promise<BookShelf> {
    return this.bookShelfRepository.getBookShelfById(id);
  }

  createBookShelf(createBookShelfDto: CreateBookShelfDto, user: User): Promise<BookShelf> {
    return this.bookShelfRepository.createBookShelf(createBookShelfDto, user);
  }

  updateBookShelf(id: number, updateBookShelfDto: UpdateBookShelfDto): Promise<BookShelf> {
    return this.bookShelfRepository.updateBookShelf(id, updateBookShelfDto);
  }

  deleteBookShelf(id: number): Promise<void> {
    return this.bookShelfRepository.deleteBookShelf(id);
  }
}
