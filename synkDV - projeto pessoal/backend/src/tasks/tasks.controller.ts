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
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly TasksService: TasksService) {}

  // CREATE
  @Post('register')
  register(@Body() body: any) {
    return this.TasksService.register(body);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.TasksService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.TasksService.findById(id);
  }

  // UPDATE
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.TasksService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.TasksService.delete(id);
  }
}
