import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credential.dto';
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

  async getById(email: string) {
    const user = await this.userRepository.getByIdUser(email);
    return {
      result: user ? false : true,
    };
  }

  async signUp(authcredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return await this.userRepository.createUser(authcredentialsDTO);
  }

  async login(authcredentialsDTO: AuthCredentialsDTO) {
    const { email, password } = authcredentialsDTO;
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
