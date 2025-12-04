import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskPagesService } from './taskPages.service';

@Controller('TaskPages')
export class TaskPagesController {
  constructor(private readonly taskPagesService: TaskPagesService) {}

  // CREATE
  @Post('register')
  register(@Body() body: any) {
    return this.taskPagesService.register(body);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.taskPagesService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.taskPagesService.findById(id);
  }

  // UPDATE
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.taskPagesService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskPagesService.delete(id);
  }
}
