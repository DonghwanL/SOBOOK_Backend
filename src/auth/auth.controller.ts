import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './entity/user.entity';
import { GetUser } from './get-user-decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/:email')
  checkEmail(@Param('email') email: string) {
    return this.authService.checkEmail(email);
  }

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
  authTest(@GetUser() user: User) {
    console.log(user);
  }
}
