import { ApiProperty } from '@nestjs/swagger';
import { EventType } from '../dto/create-event.dto';

export class StageEntity {
  @ApiProperty() id!: string;
  @ApiProperty() eventId!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ required: false }) notes?: string;
}

export enum TaskStatusEntity {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  BLOCKED = 'BLOCKED',
  DONE = 'DONE',
}

export enum TaskPriorityEntity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export class TaskEntity {
  @ApiProperty() id!: string;
  @ApiProperty() eventId!: string;
  @ApiProperty({ required: false }) stageId?: string;
  @ApiProperty() title!: string;
  @ApiProperty({ required: false }) description?: string;
  @ApiProperty({ enum: TaskStatusEntity }) status!: TaskStatusEntity;
  @ApiProperty({ enum: TaskPriorityEntity }) priority!: TaskPriorityEntity;
  @ApiProperty({ required: false }) dueAt?: string;
  @ApiProperty({ required: false }) assigneeId?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class ScheduleItemEntity {
  @ApiProperty() id!: string;
  @ApiProperty() eventId!: string;
  @ApiProperty({ required: false }) stageId?: string;
  @ApiProperty() title!: string;
  @ApiProperty({
    enum: ['DOORS', 'PERFORMANCE', 'CHANGEOVER', 'CURFEW', 'NOTE'] as const,
  })
  kind!: 'DOORS' | 'PERFORMANCE' | 'CHANGEOVER' | 'CURFEW' | 'NOTE';
  @ApiProperty() startAt!: string;
  @ApiProperty() endAt!: string;
  @ApiProperty({ required: false }) notes?: string;
  @ApiProperty({ required: false }) artist?: string;
}

export class EventEntity {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ enum: EventType }) type!: EventType;
  @ApiProperty() startAt!: string;
  @ApiProperty() endAt!: string;
  @ApiProperty({ required: false }) location?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class EventDetailEntity extends EventEntity {
  @ApiProperty({ type: () => [StageEntity] }) stages!: StageEntity[];
  @ApiProperty({ type: () => [TaskEntity] }) tasks!: TaskEntity[];
  @ApiProperty({ type: () => [ScheduleItemEntity] })
  scheduleItems!: ScheduleItemEntity[];
}

export class OkResponse {
  @ApiProperty() ok!: boolean;
}
