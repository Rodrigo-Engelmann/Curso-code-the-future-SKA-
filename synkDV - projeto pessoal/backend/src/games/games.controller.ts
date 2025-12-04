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
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    // CREATE
    @Post('register')
    register(@Body() body: any) {
        return this.gamesService.register(body);
    }

    // GET ALL
    @Get()
    findAll() {
        return this.gamesService.findAll();
    }

    // GET BY ID
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.gamesService.findById(id);
    }

    // UPDATE
    @Patch(':id')
    update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    ) {
        return this.gamesService.update(id, body);
    }

    // DELETE
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.gamesService.delete(id);
    }
}
