import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';

@Controller('auth')
export class AuthController {
  // 依赖注入
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  async login(@Body() params) {
    await this.authService.login(params.username, params.password);
    return 'auth';
  }
}
