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
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // CREATE
  @Post('register')
  register(@Body() body: any) {
    return this.filesService.register(body);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.findById(id);
  }

  // UPDATE
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.filesService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.delete(id);
  }
}
