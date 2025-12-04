import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskPages } from './taskPages.entity';
import { TaskPagesService } from './taskPages.service';
import { TaskPagesController } from './taskPages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskPages])],
  controllers: [TaskPagesController],
  providers: [TaskPagesService],
  exports: [TaskPagesService],
})
export class TaskPagesModule {}
