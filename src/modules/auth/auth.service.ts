import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as md5 from 'md5';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(username, password) {
    const user = await this.userService.findByUsername(username);
    const md5Password = md5(password).toUpperCase();

    console.log(user, md5Password);

    if (user.password !== md5Password) {
      // 如果两者不相等，要抛出异常
      throw new UnauthorizedException('密码错误');
    }
    // 如果两者相等，那接下来就去生成token
  }
}
