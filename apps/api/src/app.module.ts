import { ScheduleModule } from './schedule/schedule.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EventsModule } from './events/events.module';
import { StagesModule } from './stages/stages.module';
import { TasksModule } from './tasks/tasks.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { NotificationsModule } from './notifications/notifications.module';
import { StaffingModule } from './staffing/staffing.module';

@Module({
  imports: [
    ScheduleModule,
    PrismaModule,
    EventsModule,
    StagesModule,
    TasksModule,
    WorkspacesModule,
    NotificationsModule,
    StaffingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
