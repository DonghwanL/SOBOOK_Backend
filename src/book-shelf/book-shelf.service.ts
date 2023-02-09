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

  getAllBookShelf(user: User): Promise<BookShelf[]> {
    return this.bookShelfRepository.getAllBookShelf(user);
  }

  getBookShelfById(id: number): Promise<BookShelf> {
    return this.bookShelfRepository.getBookShelfById(id);
  }

  createBookShelf(createBookShelfDto: CreateBookShelfDto, user: User): Promise<void> {
    return this.bookShelfRepository.createBookShelf(createBookShelfDto, user);
  }

  updateBookShelf(id: number, user: User, updateBookShelfDto: UpdateBookShelfDto): Promise<BookShelf> {
    return this.bookShelfRepository.updateBookShelf(id, user, updateBookShelfDto);
  }

  deleteBookShelf(id: number, user: User): Promise<void> {
    return this.bookShelfRepository.deleteBookShelf(id, user);
  }
}
