import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsEnum, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationType } from '@prisma/client';

export class FilterNotificationsDto {
    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    unreadOnly?: boolean;

    @ApiProperty({ required: false, enum: NotificationType })
    @IsEnum(NotificationType)
    @IsOptional()
    type?: NotificationType;

    @ApiProperty({ required: false })
    @IsNumber()
    @Min(1)
    @IsOptional()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({ required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    @Type(() => Number)
    skip?: number;
}
