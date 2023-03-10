import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
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
  contents: string;

  @ManyToOne(() => User, user => user.bookShelf, { eager: false, nullable: false, onDelete: 'SET NULL' })
  user: User;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: BookStatus.READING })
  status: BookStatus;
}
