import * as bcrypt from 'bcryptjs';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from 'src/common/typeorm-ex.decorator';
import { User } from '../entity/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, nickname, password } = authcredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ email, nickname, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 이메일 입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
