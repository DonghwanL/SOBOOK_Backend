import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto';

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
  signUp(@Body() userDTO: UserDTO) {
    this.logger.verbose(`signUp: ${JSON.stringify(userDTO)}`);
    return this.authService.signUp(userDTO);
  }

  @Post('/login')
  async login(@Body() userDTO: UserDTO) {
    this.logger.verbose(`login: ${JSON.stringify(userDTO.email)}`);
    const accessToken = await this.authService.login(userDTO);
    return accessToken;
  }
}
