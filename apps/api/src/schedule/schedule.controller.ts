import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { CreateScheduleItemDto } from './dto/create-schedule-item.dto';
import { UpdateScheduleItemDto } from './dto/update-schedule-item.dto';
import { OkResponse, ScheduleItemEntity } from '../events/entities/event.entity';

@ApiTags('schedule')
@Controller('events/:eventId/schedule')
export class ScheduleController {
  constructor(private svc: ScheduleService) {}

  @Get()
  @ApiOkResponse({ type: ScheduleItemEntity, isArray: true })
  list(@Param('eventId') eventId: string) {
    return this.svc.list(eventId);
  }

  @Post()
  @ApiCreatedResponse({ type: ScheduleItemEntity })
  create(@Param('eventId') eventId: string, @Body() dto: CreateScheduleItemDto) {
    return this.svc.create(eventId, dto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ScheduleItemEntity })
  update(
    @Param('eventId') eventId: string,
    @Param('id') id: string,
    @Body() dto: UpdateScheduleItemDto
  ) {
    return this.svc.update(eventId, id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OkResponse })
  remove(@Param('eventId') eventId: string, @Param('id') id: string) {
    return this.svc.remove(eventId, id);
  }
}
