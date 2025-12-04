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
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // CREATE
  @Post('register')
  register(@Body() body: any) {
    return this.teamsService.register(body);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.findById(id);
  }

  // UPDATE
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.teamsService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.delete(id);
  }

  // REMOVE USER PRO TEAM RELATION
  @Delete(':teamId/users/:userId')
  async removeUserFromTeam(
      @Param('teamId') teamId: string,
      @Param('userId') userId: string
    ) {

    return await this.teamsService.removeUserFromTeam(+teamId, +userId);
  }

  @Post(':teamId/users/:userId')
  async addUserToTeam(
      @Param('teamId') teamId: number,
      @Param('userId') userId: number,
    ) {
      return this.teamsService.addUserToTeam(teamId, userId);
  }

}
