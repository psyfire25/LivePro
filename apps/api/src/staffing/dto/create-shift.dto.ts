import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateShiftDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  eventId?: string;

  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
