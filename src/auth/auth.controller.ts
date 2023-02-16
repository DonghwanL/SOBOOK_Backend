import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto';
import { Tokens } from './types';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';

@Controller('api/auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Public()
  @Get('/:id')
  getById(@Param('id') id: string) {
    this.logger.verbose(`checkEmail: ${id}`);
    return this.authService.getById(id);
  }

  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() userDTO: UserDTO): Promise<Tokens> {
    this.logger.verbose(`signUp: ${JSON.stringify(userDTO)}`);
    return this.authService.signUp(userDTO);
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userDTO: UserDTO): Promise<Tokens> {
    this.logger.verbose(`login: ${JSON.stringify(userDTO.email)}`);
    return await this.authService.login(userDTO);
  }

  @UseGuards(AtGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    this.logger.verbose(`logout: ${userId}`);
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string) {
    this.logger.verbose(`refreshToken: ${userId}`);
    this.authService.refreshToken(userId, refreshToken);
  }
}
