import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BookStatus } from './book-shelf.model';

export class BookShelf extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
