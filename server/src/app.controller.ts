import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  searchUsers(@Query('email') email: string, @Query('number') number: string) {
    return this.appService.searchUsers(email, number);
  }
}
