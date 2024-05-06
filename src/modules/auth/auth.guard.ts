import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './public.decorator';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from './auth.jwt.secret';

@Injectable()
export class AuthGuard implements CanActivate {
  // 把reflector注入进来，用来获取元数据
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  // 该函数负责请求被发送过来到后端，并且业务逻辑开始之前，要做的一些事情，在该函数里进行处理
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 返回true，表示允许调用
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    // token不存在的话，报错
    if (!token) {
      throw new UnauthorizedException();
    }
    // 如果token存在，那么就要到JWT去验证这个token 的有效性
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET_KEY,
      });
      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}

function extractTokenFromHeader(request) {
  // 先要看看有没有authorization字段，如果authorization字段不存在或为空，则type和token变量的值均为空数组
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : '';
}
