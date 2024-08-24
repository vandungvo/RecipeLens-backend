import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(@Res() res: Response): void {
    const filePath = join(__dirname, '..', 'public', 'index.html');
    res.sendFile(filePath); // Send the static HTML file
  }

  @Get('testapi')
  testAPI() {
    return this.appService.testAPI();
  }
}
