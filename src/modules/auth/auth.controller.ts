import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { error, success } from 'src/utils';

@Controller('auth')
export class AuthController {
  // 依赖注入
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  login(@Body() params) {
    return this.authService
      .login(params.username, params.password)
      .then((data) => success(data, '登录成功'))
      .catch((err) => error(err.message));
  }
}
