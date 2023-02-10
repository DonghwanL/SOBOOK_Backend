import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BookShelf } from '../entity/book-shelf.entity';
import { CustomRepository } from '../../common/typeorm-ex.decorator';
import { CreateBookShelfDTO } from '../dto/create-bookShelf.dto';
import { UpdateBookShelfDTO } from '../dto/update-bookShelf.dto';
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

  async createBookShelf(createBookShelfDTO: CreateBookShelfDTO, user: User): Promise<void> {
    const { title, image, author, publisher, pubdate, memo, rating } = createBookShelfDTO;
    const findBook = await this.findOneBy({ title });

    if (findBook) throw new BadRequestException('이미 등록된 서적 입니다.');

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
  }

  async updateBookShelf(id: number, user: User, updateBookShelfDTO: UpdateBookShelfDTO): Promise<BookShelf> {
    const query = this.createQueryBuilder('bookShelf');
    query.where('bookShelf.userId = :userId', { userId: user.id });
    query.andWhere('bookShelf.id = :id', { id });
    const findBook = await query.getOne();

    if (!findBook) throw new NotFoundException('해당되는 서적을 찾을 수 없습니다.');

    const { memo, rating, status } = updateBookShelfDTO;

    findBook.memo = memo;
    findBook.rating = rating;
    findBook.status = status ? status : findBook.status;

    await this.save(findBook);
    return findBook;
  }

  async deleteBookShelf(id: number, user: User): Promise<void> {
    const result = await this.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`해당되는 서적을 찾을 수 없습니다.`);
    }
  }
}
