import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';

export const GetCurrentUser = createParamDecorator((data, context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
