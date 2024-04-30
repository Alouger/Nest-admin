import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getData(): string {
    return 'get data';
  }
}
