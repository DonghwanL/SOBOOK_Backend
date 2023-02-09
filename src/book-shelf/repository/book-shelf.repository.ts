import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { BookShelf } from '../entity/book-shelf.entity';
import { CustomRepository } from '../../common/typeorm-ex.decorator';
import { CreateBookShelfDto } from '../dto/create-bookShelf.dto';
import { UpdateBookShelfDto } from '../dto/update-bookShelf.dto';
import { User } from 'src/auth/entity/user.entity';

@CustomRepository(BookShelf)
export class BookShelfRepository extends Repository<BookShelf> {
  async getAllBookShelf(user: User): Promise<BookShelf[]> {
    const query = this.createQueryBuilder('bookShelf');
    query.where('bookShelf.userId = :userId', { userId: user.id });
    const bookShelf = await query.getMany();

    return bookShelf;
  }

  async getBookShelfById(id: number): Promise<BookShelf> {
    const found = await this.findOneBy({ id });
    if (!found) throw new NotFoundException('해당되는 서적을 찾을 수 없습니다.');

    return found;
  }

  async createBookShelf(createBookShelfDto: CreateBookShelfDto, user: User): Promise<BookShelf> {
    const { title, image, author, publisher, pubdate, memo, rating } = createBookShelfDto;

    const bookShelf = this.create({
      title,
      image,
      author,
      publisher,
      pubdate,
      memo,
      rating,
      user,
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

  async deleteBookShelf(id: number, user: User): Promise<void> {
    const found = await this.getBookShelfById(id);
    await this.delete({ id: found.id, user });
  }
}
