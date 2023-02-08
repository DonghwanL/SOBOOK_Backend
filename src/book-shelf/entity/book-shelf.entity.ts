import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from './common.entity';
import { BookStatus } from '../book-status.enum';

@Entity({ name: 'BookShelf' })
export class BookShelf extends Common {
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

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  memo: string;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: BookStatus.READING })
  status: BookStatus;
}
