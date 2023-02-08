import { Injectable, NotFoundException } from '@nestjs/common';
import { BookStatus } from './book-status.enum';
import { CreateBookShelfDto } from './dto/create-bookShelf.dto';

@Injectable()
export class BookShelfService {
  // getAllBookShelf(): BookShelf[] {
  //   return this.bookShelf;
  // }
  // createBookShelf(createBookShelfDto: CreateBookShelfDto) {
  //   const { title, image, author, publisher, pubdate, memo, rating } = createBookShelfDto;
  //   const bookShelf: BookShelf = {
  //     id: uuid(),
  //     title,
  //     image,
  //     author,
  //     publisher,
  //     pubdate,
  //     memo,
  //     rating,
  //     status: BookStatus.READING,
  //   };
  //   this.bookShelf.push(bookShelf);
  //   return bookShelf;
  // }
  // getBookShelfById(id: string): BookShelf {
  //   const find = this.bookShelf.find((book) => book.id === id);
  //   if (!find) throw new NotFoundException('해당되는 서적을 찾을 수 없습니다.');
  //   return find;
  // }
  // deleteBookShelf(id: string): void {
  //   const find = this.getBookShelfById(id);
  //   this.bookShelf = this.bookShelf.filter((book) => book.id !== find.id);
  // }
  // updateBookStatus(id: string, status: BookStatus): BookShelf {
  //   const bookShelf = this.getBookShelfById(id);
  //   bookShelf.status = status;
  //   return bookShelf;
  // }
}
