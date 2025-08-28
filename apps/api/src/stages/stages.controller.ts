import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { StageEntity } from '../events/entities/event.entity';

@ApiTags('stages')
@Controller('events/:eventId/stages')
export class StagesController {
  constructor(private svc: StagesService) {}

  @Get()
  @ApiOkResponse({ type: StageEntity, isArray: true })
  list(@Param('eventId') eventId: string) {
    return this.svc.list(eventId);
  }

  @Post()
  @ApiCreatedResponse({ type: StageEntity })
  create(@Param('eventId') eventId: string, @Body() dto: CreateStageDto) {
    return this.svc.create(eventId, dto);
  }
}

