import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskPriorityEntity } from '../../events/entities/event.entity';

export class CreateTaskDto {
  @ApiProperty() @IsString() title!: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
  @ApiProperty({ enum: TaskPriorityEntity, required: false })
  @IsOptional()
  @IsEnum(TaskPriorityEntity)
  priority?: TaskPriorityEntity;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dueAt?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() stageId?: string;
}
