import { ApiProperty } from '@nestjs/swagger';
import {
  Notification,
  NotificationType,
  NotificationSeverity,
} from '@prisma/client';

export class NotificationEntity implements Notification {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ enum: NotificationType })
  type: NotificationType;

  @ApiProperty({ enum: NotificationSeverity })
  severity: NotificationSeverity;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ nullable: true })
  actionUrl: string | null;

  @ApiProperty({ nullable: true })
  workspaceId: string | null;

  @ApiProperty({ nullable: true })
  eventId: string | null;

  @ApiProperty({ nullable: true })
  taskId: string | null;

  @ApiProperty({ nullable: true })
  metadata: any;

  @ApiProperty()
  read: boolean;

  @ApiProperty({ nullable: true })
  readAt: Date | null;

  @ApiProperty()
  archived: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ nullable: true })
  expiresAt: Date | null;
}
