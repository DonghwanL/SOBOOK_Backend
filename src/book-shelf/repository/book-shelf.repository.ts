import { Repository } from 'typeorm';
import { BookShelf } from '../entity/book-shelf.entity';
import { CustomRepository } from '../../common/decorators/typeorm-ex.decorator';

@CustomRepository(BookShelf)
export class BookShelfRepository extends Repository<BookShelf> {}
