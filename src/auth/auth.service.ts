import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './repository/user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.getByIdUser(email);
    if (user) return { result: false };
    else return { result: true };
  }

  async signUp(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.createUser(authcredentialsDto);
  }

  async login(authcredentialsDto: AuthCredentialsDto) {
    const { email, password } = authcredentialsDto;
    const user = await this.userRepository.getByIdUser(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const token = this.jwtService.sign(payload);
      return {
        token,
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: Number(this.configService.get('JWT_EXPIRATION_TIME')) * 1000,
      };
    } else {
      throw new UnauthorizedException('이메일 혹은 비밀번호를 확인 해주세요.');
    }
  }

  async logOut() {
    return {
      token: '',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: 0,
    };
  }
}
