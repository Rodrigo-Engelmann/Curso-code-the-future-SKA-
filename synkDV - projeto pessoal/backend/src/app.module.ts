import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AreasModule } from './areas/areas.module';
import { FilesModule } from './files/files.module';
import { GamesModule } from './games/games.module';
import { MilestonesModule } from './milestones/milestones.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { TaskPagesModule } from './taskPages/taskPages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'synkDV_db',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: false,
    }),
    UsersModule,
    AuthModule,
    AreasModule,
    FilesModule,
    GamesModule,
    MilestonesModule,
    NotificationsModule,
    TaskPagesModule,
    TasksModule,
    TeamsModule,
  ],
})
export class AppModule {}
