import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookShelf } from './entity/book-shelf.entity';
import { BookShelfRepository } from './repository/book-shelf.repository';
import { CreateBookShelfDto } from './dto/create-bookShelf.dto';
import { UpdateBookShelfDto } from './dto/update-bookShelf.dto';

@Injectable()
export class BookShelfService {
  constructor(
    @InjectRepository(BookShelfRepository)
    private bookShelfRepository: BookShelfRepository,
  ) {}

  getAllBookShelf(): Promise<BookShelf[]> {
    return this.bookShelfRepository.getAllBookShelf();
  }

  createBookShelf(createBookShelfDto: CreateBookShelfDto): Promise<BookShelf> {
    return this.bookShelfRepository.createBookShelf(createBookShelfDto);
  }

  getBookShelfById(id: number): Promise<BookShelf> {
    return this.bookShelfRepository.getBookShelfById(id);
  }

  deleteBookShelf(id: number): Promise<void> {
    return this.bookShelfRepository.deleteBookShelf(id);
  }

  updateBookShelf(id: number, updateBookShelfDto: UpdateBookShelfDto): Promise<BookShelf> {
    return this.bookShelfRepository.updateBookShelf(id, updateBookShelfDto);
  }
}
