import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export enum EventType {
  CLUB_NIGHT = 'CLUB_NIGHT',
  CONCERT = 'CONCERT',
  FESTIVAL = 'FESTIVAL',
  CONFERENCE = 'CONFERENCE',
  PRIVATE = 'PRIVATE',
}

export class CreateEventDto {
  @ApiProperty() @IsString() name!: string;
  @ApiProperty({ enum: EventType }) @IsEnum(EventType) type!: EventType;
  @ApiProperty() @IsDateString() startAt!: string;
  @ApiProperty() @IsDateString() endAt!: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() location?: string;
}
