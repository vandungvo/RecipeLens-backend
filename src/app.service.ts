import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async testAPI() {
    return 'Hello, I am testing API, and it works fine!';
  }
}
