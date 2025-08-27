import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { CreateScheduleItemDto } from './dto/create-schedule-item.dto';
import { UpdateScheduleItemDto } from './dto/update-schedule-item.dto';

@ApiTags('schedule')
@Controller('events/:eventId/schedule')
export class ScheduleController {
  constructor(private svc: ScheduleService) {}

  @Get() list(@Param('eventId') eventId: string) {
    return this.svc.list(eventId);
  }

  @Post() create(@Param('eventId') eventId: string, @Body() dto: CreateScheduleItemDto) {
    return this.svc.create(eventId, dto);
  }

  @Patch(':id') update(
    @Param('eventId') eventId: string,
    @Param('id') id: string,
    @Body() dto: UpdateScheduleItemDto
  ) {
    return this.svc.update(eventId, id, dto);
  }

  @Delete(':id') remove(@Param('eventId') eventId: string, @Param('id') id: string) {
    return this.svc.remove(eventId, id);
  }
}