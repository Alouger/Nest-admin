import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from './auth.jwt.secret';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      // 表示JWT模块的配置应应用于整个应用，而非仅限于当前模块。
      global: true,
      // 用于生成JWT token的第三段的私钥
      secret: JWT_SECRET_KEY,
      // 设置token过期时间，在此设置为24小时过期
      signOptions: { expiresIn: 24 * 60 * 60 + 's' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // 在providers中注册请求守卫，在这不能像其他那样通过class的方式注册，而是写成一个对象的形式
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
