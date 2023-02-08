import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BookStatus } from '../book-status.enum';
import { Common } from './common.entity';

@Entity()
export class BookShelf extends Common {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  pubdate: string;

  @Column()
  image: string;

  @Column()
  memo: string;

  @Column()
  rating: number;

  @Column()
  status: BookStatus;
}
