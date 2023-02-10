import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Get('/:email')
  checkEmail(@Param('email') email: string) {
    this.logger.verbose(`checkEmail: ${email}`);
    return this.authService.checkEmail(email);
  }

  @Post('/signup')
  signUp(@Body() authcredentialsDto: AuthCredentialsDto) {
    this.logger.verbose(`signUp: ${JSON.stringify(authcredentialsDto)}`);
    return this.authService.signUp(authcredentialsDto);
  }

  @Post('/login')
  async login(@Body() authcredentialsDto: AuthCredentialsDto, @Res({ passthrough: true }) res: Response) {
    this.logger.verbose(`login: ${JSON.stringify(authcredentialsDto.email)}`);

    const accessToken = await this.authService.login(authcredentialsDto);
    res.cookie('Authentication', accessToken, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });

    return accessToken;
  }
}
