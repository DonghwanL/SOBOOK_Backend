import { BookShelf } from 'src/book-shelf/entity/book-shelf.entity';
import { Common } from 'src/book-shelf/entity/common.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  nickName: string;

  @Column()
  password: string;

  @OneToMany(type => BookShelf, bookShelf => bookShelf.user, { eager: true })
  bookShelf: BookShelf[];

  @Column({ default: true })
  isActive: boolean;
}
