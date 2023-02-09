import { Repository } from 'typeorm';
import { CustomRepository } from 'src/common/typeorm-ex.decorator';
import { User } from '../entity/user.entity';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, nickName, password } = authcredentialsDto;
    const user = this.create({ email, nickName, password });
    await this.save(user);
  }
}
