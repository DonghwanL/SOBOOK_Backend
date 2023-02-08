import { Repository } from 'typeorm';
import { BookShelf } from './book-shelf.entity';
import { CustomRepository } from './typeorm-ex.decorator';

@CustomRepository(BookShelf)
export class BookShelfRepository extends Repository<BookShelf> {}
