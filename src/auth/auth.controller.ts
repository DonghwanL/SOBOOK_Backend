import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authcredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authcredentialsDto);
  }

  @Post('/login')
  Login(@Body() authcredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.login(authcredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  authTest(@Req() req) {
    console.log(req);
  }
}
