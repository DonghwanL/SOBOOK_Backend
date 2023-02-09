import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { BookShelf } from '../entity/book-shelf.entity';
import { CustomRepository } from '../../common/typeorm-ex.decorator';
import { CreateBookShelfDto } from '../dto/create-bookShelf.dto';
import { UpdateBookShelfDto } from '../dto/update-bookShelf.dto';

@CustomRepository(BookShelf)
export class BookShelfRepository extends Repository<BookShelf> {
  async getAllBookShelf(): Promise<BookShelf[]> {
    return this.find();
  }

  async getBookShelfById(id: number): Promise<BookShelf> {
    const found = await this.findOneBy({ id: id });
    if (!found) throw new NotFoundException('해당되는 서적을 찾을 수 없습니다.');

    return found;
  }

  async createBookShelf(createBookShelfDto: CreateBookShelfDto): Promise<BookShelf> {
    const { title, image, author, publisher, pubdate, memo, rating } = createBookShelfDto;

    const bookShelf = this.create({
      title,
      image,
      author,
      publisher,
      pubdate,
      memo,
      rating,
    });

    await this.save(bookShelf);
    return bookShelf;
  }

  async updateBookShelf(id: number, updateBookShelfDto: UpdateBookShelfDto): Promise<BookShelf> {
    const updateBook = await this.getBookShelfById(id);
    const { memo, rating, status } = updateBookShelfDto;

    updateBook.memo = memo;
    updateBook.rating = rating;
    updateBook.status = status ? status : updateBook.status;

    await this.save(updateBook);
    return updateBook;
  }

  async deleteBookShelf(id: number): Promise<void> {
    const found = await this.getBookShelfById(id);
    await this.delete(found.id);
  }
}
