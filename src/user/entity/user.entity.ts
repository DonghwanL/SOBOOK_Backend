import { Exclude } from 'class-transformer';
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
  nickname: string;

  @Column()
  password: string;

  @OneToMany(() => BookShelf, bookShelf => bookShelf.user, { eager: true })
  bookShelf: BookShelf[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  @Exclude()
  hashedRt?: string;
}
