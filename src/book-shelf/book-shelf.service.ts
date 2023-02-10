import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookShelf } from './entity/book-shelf.entity';
import { BookShelfRepository } from './repository/book-shelf.repository';
import { CreateBookShelfDTO } from './dto/create-bookShelf.dto';
import { UpdateBookShelfDTO } from './dto/update-bookShelf.dto';
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

  createBookShelf(createBookShelfDTO: CreateBookShelfDTO, user: User): Promise<void> {
    return this.bookShelfRepository.createBookShelf(createBookShelfDTO, user);
  }

  updateBookShelf(id: number, user: User, updateBookShelfDTO: UpdateBookShelfDTO): Promise<BookShelf> {
    return this.bookShelfRepository.updateBookShelf(id, user, updateBookShelfDTO);
  }

  deleteBookShelf(id: number, user: User): Promise<void> {
    return this.bookShelfRepository.deleteBookShelf(id, user);
  }
}
