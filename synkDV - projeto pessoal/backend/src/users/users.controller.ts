import { 
  Controller, 
  UseInterceptors,
  UploadedFile,
  Patch,
  Post,
  Delete, 
  Body, 
  Get, 
  Param, 
  UnauthorizedException, 
  UseGuards, 
  Req 
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ParseIntPipe } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from '../auth/dto/update-user.dto';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.usersService.register(body);
  }

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { message: 'Login successful', user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return this.usersService.findById(req.user.userId);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  @UseInterceptors(FileInterceptor('profile_picture'))
  async updateUser(
    @Req() req: any,
    @Body() data: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const userId = req.user.id;

    return this.usersService.updateUser(userId, data, file);
  }
  
  @Delete('delete-all')
  async deleteAll() {
      return this.usersService.deleteAllUsers();
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async deleteAccount(@Req() req: any) {
    return this.usersService.deleteAccount(req.user.id);
  }

  @Get('find-email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
