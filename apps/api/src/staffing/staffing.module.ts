import { Module } from '@nestjs/common';
import { StaffingController } from './staffing.controller';
import { StaffingService } from './staffing.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StaffingController],
  providers: [StaffingService],
})
export class StaffingModule { }
