import { Body, Controller, Get, Logger, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credential.dto';

@Controller('api/auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Get('/:id')
  getById(@Param('id') id: string) {
    this.logger.verbose(`checkEmail: ${id}`);
    return this.authService.getById(id);
  }

  @Post('/signup')
  signUp(@Body() authcredentialsDTO: AuthCredentialsDTO) {
    this.logger.verbose(`signUp: ${JSON.stringify(authcredentialsDTO)}`);
    return this.authService.signUp(authcredentialsDTO);
  }

  @Post('/login')
  async login(@Body() authcredentialsDTO: AuthCredentialsDTO) {
    this.logger.verbose(`login: ${JSON.stringify(authcredentialsDTO.email)}`);
    const accessToken = await this.authService.login(authcredentialsDTO);
    return accessToken;
  }
}
