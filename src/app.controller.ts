// Param: restful API 参数
// Query: url 参数
// Body: post 参数
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Query,
  Body,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TestService } from './test.service';
import { HttpExceptionFilter } from './exception/http-exception.filter';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly testService: TestService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Get：获取数据
  // Post：插入数据
  // Put：更新数据
  // Delete：删除数据

  @Get('/data/:id/:subId')
  @UseFilters(new HttpExceptionFilter())
  // 形参里的params不是非得叫params，可以随意起名
  getData(@Param() params): string {
    console.log(params);
    // return 'get data ' + params.id + ' and ' + params.subId;
    return this.testService.getData();
  }

  @Get('/data')
  @UseFilters(new HttpExceptionFilter())
  getAllData(): string {
    return 'get_all_data';
  }

  @Post('/data')
  @UseFilters(new HttpExceptionFilter())
  addData(@Body() body, @Query() query): string {
    console.log(body, query);
    return 'add_data: ' + JSON.stringify(body) + ', id= ' + query.id;
  }

  @Put('/data')
  @UseFilters(new HttpExceptionFilter())
  updateData(): string {
    return 'update_data';
  }

  @Delete('/data/:id')
  @UseFilters(new HttpExceptionFilter())
  deleteData(): string {
    return 'delete_data';
  }
}
