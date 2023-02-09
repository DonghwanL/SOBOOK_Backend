import { Body, Controller, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
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
  login(@Body() authcredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    this.logger.verbose(`login: ${JSON.stringify(authcredentialsDto)}`);
    return this.authService.login(authcredentialsDto);
  }
}
