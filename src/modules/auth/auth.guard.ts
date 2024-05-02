import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  // 把reflector注入进来，用来获取元数据
  constructor(private reflector: Reflector) {}

  // 该函数负责请求被发送过来到后端，并且业务逻辑开始之前，要做的一些事情，在该函数里进行处理
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 返回true，表示允许调用
      return true;
    }
    // 返回undefined，表示不允许调用
    return undefined;
  }
}
