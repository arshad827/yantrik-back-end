import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { KeywordDto } from './dto/keyword.dto';
/**
 * add-keywords
 * get-keywords
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  /**
  *  inserting new record in DB
  * I can use Firebase to add/(collections/documents) or retreive it but I used Mysql to quick start
  */
  @Post('add-keyword')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addKeyword(
    @Body() data: KeywordDto): Promise<any> {
    return this.appService.addKeyword(data);
  }

  /**
  *  get new record from DB and process it in backend asper each keyword and return with key and its  values
  */
  @Post('get-keywords')
  @UsePipes(new ValidationPipe({ transform: true })) // param validation
  getKeyword(
    @Body() pagination: { pageSize: number, pageIndex: number }): Promise<any> {
    return this.appService.getKeyword(pagination);
  }

}
