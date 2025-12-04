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
import { AreasService } from './areas.service';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  // CREATE
  @Post('register')
  register(@Body() body: any) {
    return this.areasService.register(body);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.areasService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.areasService.findById(id);
  }

  // UPDATE
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.areasService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.areasService.delete(id);
  }
}
