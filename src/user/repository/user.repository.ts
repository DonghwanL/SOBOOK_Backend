import { Repository } from 'typeorm';
import { CustomRepository } from 'src/common/decorators/typeorm-ex.decorator';
import { User } from '../entity/user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
