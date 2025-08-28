import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TaskStatusEntity } from '../../events/entities/event.entity';

export class UpdateTaskStatusDto {
  @ApiProperty({ enum: TaskStatusEntity })
  @IsEnum(TaskStatusEntity)
  status!: TaskStatusEntity;
}

