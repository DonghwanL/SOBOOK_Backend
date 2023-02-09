import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Common } from './common.entity';
import { BookStatus } from '../book-status.enum';

@Entity({ name: 'bookShelf' })
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

  @ManyToOne(type => User, user => user.bookShelf, { eager: false, nullable: false, onDelete: 'CASCADE' })
  user: User;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: BookStatus.READING })
  status: BookStatus;
}
