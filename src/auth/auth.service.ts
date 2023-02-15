import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from '../user/dto/user.dto';
import { UserRepository } from '../user/repository/user.repository';
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
    const result = await this.userRepository.getByIdUser(email);
    return result ? false : true;
  }

  async signUp(userDTO: UserDTO): Promise<void> {
    return await this.userRepository.createUser(userDTO);
  }

  async login(userDTO: UserDTO) {
    const { email, password } = userDTO;
    const user = await this.userRepository.getByIdUser(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };

      return {
        accessToken: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        }),
        refreshToken: this.jwtService.sign(payload, {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        }),
      };
    } else {
      throw new UnauthorizedException('이메일 혹은 비밀번호를 확인 해주세요.');
    }
  }
}
