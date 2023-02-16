import * as argon from 'argon2';
import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from '../user/dto/user.dto';
import { UserRepository } from '../user/repository/user.repository';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getById(email: string) {
    const result = await this.userRepository.findOneBy({ email });
    return result ? false : true;
  }

  async signUp(userDTO: UserDTO): Promise<Tokens> {
    const { email, nickname, password } = userDTO;
    const hashPassword = await argon.hash(password);
    const newUser = await this.userRepository.create({ email, nickname, password: hashPassword });
    const tokens = await this.getTokens(newUser.id, newUser.email, newUser.nickname);

    try {
      await this.userRepository.save(newUser);
      await this.updateRtHash(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 이메일 입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(userDTO: UserDTO): Promise<Tokens> {
    const { email, password } = userDTO;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new ForbiddenException('Access Denied');

    //|| !user.hashedRt
    const passwordMatches = await argon.verify(user.password, password);
    if (!passwordMatches) throw new ForbiddenException('비밀번호가 일치하지 않습니다.');

    const tokens = await this.getTokens(user.id, user.email, user.nickname);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return { ...tokens, nickname: user.nickname };
  }

  async logout(userId: number) {
    await this.userRepository.update(userId, {
      hashedRt: null,
    });
  }

  async refreshToken(userId: number, rt: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.nickname);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await argon.hash(rt);

    await this.userRepository.update(userId, {
      hashedRt: hash,
    });
  }

  async getTokens(id: number, email: string, nickname: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          email,
          nickname,
        },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          email,
          nickname,
        },
        {
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
