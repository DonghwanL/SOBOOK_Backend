import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async checkEmail(email: string) {
    const checkEmail = await this.userRepository.findOneBy({ email });

    if (checkEmail) return { result: false };
    else return { result: true };
  }

  signUp(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authcredentialsDto);
  }

  async login(authcredentialsDto: AuthCredentialsDto): Promise<{ access_Token: string }> {
    const { email, password } = authcredentialsDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      return { access_Token: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException('이메일 혹은 비밀번호를 확인 해주세요.');
    }
  }
}
