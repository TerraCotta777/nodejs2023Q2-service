import { DbService } from './db/db.service';
import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly dbService: DbService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
