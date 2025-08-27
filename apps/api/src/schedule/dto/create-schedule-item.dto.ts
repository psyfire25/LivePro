import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export enum ScheduleKind {
  DOORS = 'DOORS',
  PERFORMANCE = 'PERFORMANCE',
  CHANGEOVER = 'CHANGEOVER',
  CURFEW = 'CURFEW',
  NOTE = 'NOTE',
}

export class CreateScheduleItemDto {
  @ApiProperty() @IsString() title!: string;
  @ApiProperty({ enum: ScheduleKind }) @IsEnum(ScheduleKind) kind!: ScheduleKind;
  @ApiProperty() @IsDateString() startAt!: string;
  @ApiProperty() @IsDateString() endAt!: string;
  @ApiProperty({ required:false }) @IsOptional() @IsString() stageId?: string;
  @ApiProperty({ required:false }) @IsOptional() @IsString() notes?: string;
  @ApiProperty({ required:false }) @IsOptional() @IsString() artist?: string;
}