import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskEntity } from '../events/entities/event.entity';

@ApiTags('tasks')
@Controller('events/:eventId/tasks')
export class TasksController {
  constructor(private svc: TasksService) {}

  @Get()
  @ApiOkResponse({ type: TaskEntity, isArray: true })
  list(@Param('eventId') eventId: string) {
    return this.svc.list(eventId);
  }

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  create(@Param('eventId') eventId: string, @Body() dto: CreateTaskDto) {
    return this.svc.create(eventId, dto);
  }

  @Patch(':taskId/status')
  @ApiOkResponse({ type: TaskEntity })
  updateStatus(
    @Param('eventId') eventId: string,
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskStatusDto
  ) {
    return this.svc.updateStatus(eventId, taskId, dto);
  }
}

