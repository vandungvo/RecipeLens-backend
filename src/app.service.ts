import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async testAPI() {
    return 'Hello, I am testing API, and it works fine!';
  }
}
