import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookShelf } from './entity/book-shelf.entity';
import { BookShelfRepository } from './repository/book-shelf.repository';
import { CreateBookShelfDTO } from './dto/create-bookShelf.dto';
import { UpdateBookShelfDTO } from './dto/update-bookShelf.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class BookShelfService {
  constructor(
    @InjectRepository(BookShelfRepository)
    private bookShelfRepository: BookShelfRepository,
  ) {}

  async getAllBookShelf(userId: number): Promise<BookShelf[]> {
    const query = this.bookShelfRepository.createQueryBuilder('bookShelf');
    query.where('bookShelf.userId = :userId', { userId });
    query.orderBy({ 'bookShelf.updatedAt': 'DESC' });
    const bookShelf = await query.getMany();

    return bookShelf;
  }

  async getBookShelfById(id: number): Promise<BookShelf> {
    const found = await this.bookShelfRepository.findOneBy({ id });
    if (!found) throw new NotFoundException('해당되는 서적을 찾을 수 없습니다.');
    return found;
  }

  async createBookShelf(createBookShelfDTO: CreateBookShelfDTO, user: User): Promise<BookShelf> {
    const { title, image, author, publisher, pubdate, contents, rating } = createBookShelfDTO;

    const found = await this.bookShelfRepository.findOneBy({ title });
    if (found) throw new ConflictException('이미 등록된 서적 입니다.');

    const bookShelf = this.bookShelfRepository.create({
      title,
      image,
      author,
      publisher,
      pubdate,
      contents,
      rating,
      user,
    });

    return await this.bookShelfRepository.save(bookShelf);
  }

  async updateBookState(id: number, user: User, updateBookShelfDTO: UpdateBookShelfDTO): Promise<BookShelf> {
    const query = this.bookShelfRepository.createQueryBuilder('bookShelf');
    query.where('bookShelf.userId = :userId', { userId: user.id });
    query.andWhere('bookShelf.id = :id', { id });
    const findBook = await query.getOne();

    if (!findBook) throw new NotFoundException('해당되는 서적을 찾을 수 없습니다.');

    const { status } = updateBookShelfDTO;
    findBook.status = status;

    const bookShelf = await this.bookShelfRepository.save(findBook);
    return bookShelf;
  }

  async updateBookRating(id: number, user: User, updateBookShelfDTO: UpdateBookShelfDTO): Promise<BookShelf> {
    const query = this.bookShelfRepository.createQueryBuilder('bookShelf');
    query.where('bookShelf.userId = :userId', { userId: user.id });
    query.andWhere('bookShelf.id = :id', { id });
    const findBook = await query.getOne();

    if (!findBook) throw new NotFoundException('해당되는 서적을 찾을 수 없습니다.');

    const { rating } = updateBookShelfDTO;
    findBook.rating = rating;

    const bookShelf = await this.bookShelfRepository.save(findBook);
    return bookShelf;
  }

  async updateBookContents(id: number, user: User, updateBookShelfDTO: UpdateBookShelfDTO): Promise<BookShelf> {
    const query = this.bookShelfRepository.createQueryBuilder('bookShelf');
    query.where('bookShelf.userId = :userId', { userId: user.id });
    query.andWhere('bookShelf.id = :id', { id });
    const findBook = await query.getOne();

    if (!findBook) throw new NotFoundException('해당되는 서적을 찾을 수 없습니다.');

    const { contents } = updateBookShelfDTO;
    findBook.contents = contents;

    const bookShelf = await this.bookShelfRepository.save(findBook);
    return bookShelf;
  }

  async deleteBookShelf(id: number, user: User): Promise<void> {
    const result = await this.bookShelfRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`해당되는 서적을 찾을 수 없습니다.`);
    }
  }
}
