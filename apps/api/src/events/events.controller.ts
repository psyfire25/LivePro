import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { EventDetailEntity, EventEntity } from './entities/event.entity';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private svc: EventsService) {}

  @Get()
  @ApiOkResponse({ type: EventEntity, isArray: true })
  list() {
    return this.svc.list();
  }

  @Get(':id')
  @ApiOkResponse({ type: EventDetailEntity })
  get(@Param('id') id: string) {
    return this.svc.get(id);
  }

  @Post()
  @ApiCreatedResponse({ type: EventEntity })
  create(@Body() dto: CreateEventDto) {
    return this.svc.create(dto);
  }
}
