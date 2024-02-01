import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchLogsDto } from './dtos/search-logs.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  postData(@Body() searchLogsDto: SearchLogsDto) {
    return this.appService.searchLogs(searchLogsDto);
  }
}
