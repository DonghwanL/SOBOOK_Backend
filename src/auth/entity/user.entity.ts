import { Common } from 'src/book-shelf/entity/common.entity';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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

  @Column({ default: true })
  isActive: boolean;
}
