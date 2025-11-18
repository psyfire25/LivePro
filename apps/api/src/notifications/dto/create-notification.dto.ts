import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';
import { NotificationType, NotificationSeverity } from '@prisma/client';

export class CreateNotificationDto {
    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty({ enum: NotificationType })
    @IsEnum(NotificationType)
    type: NotificationType;

    @ApiProperty({ enum: NotificationSeverity, required: false })
    @IsEnum(NotificationSeverity)
    @IsOptional()
    severity?: NotificationSeverity;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    message: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    actionUrl?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    workspaceId?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    eventId?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    taskId?: string;

    @ApiProperty({ required: false })
    @IsObject()
    @IsOptional()
    metadata?: any;
}
