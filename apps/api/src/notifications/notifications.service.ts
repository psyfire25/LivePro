import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FilterNotificationsDto } from './dto/filter-notifications.dto';

@Injectable()
export class NotificationsService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateNotificationDto) {
        return this.prisma.notification.create({
            data: {
                userId: dto.userId,
                type: dto.type,
                severity: dto.severity || 'INFO',
                title: dto.title,
                message: dto.message,
                actionUrl: dto.actionUrl,
                workspaceId: dto.workspaceId,
                eventId: dto.eventId,
                taskId: dto.taskId,
                metadata: dto.metadata,
            },
        });
    }

    async findByUser(userId: string, filter?: FilterNotificationsDto) {
        const { unreadOnly, type, limit = 50, skip = 0 } = filter || {};

        return this.prisma.notification.findMany({
            where: {
                userId,
                archived: false,
                ...(unreadOnly && { read: false }),
                ...(type && { type }),
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
            skip,
            include: {
                event: {
                    select: { id: true, name: true },
                },
                task: {
                    select: { id: true, title: true },
                },
            },
        });
    }

    async findOne(id: string, userId: string) {
        return this.prisma.notification.findFirst({
            where: { id, userId },
        });
    }

    async update(id: string, userId: string, dto: UpdateNotificationDto) {
        return this.prisma.notification.updateMany({
            where: { id, userId },
            data: {
                ...dto,
                ...(dto.read && { readAt: new Date() }),
            },
        });
    }

    async markAsRead(id: string, userId: string) {
        return this.update(id, userId, { read: true });
    }

    async markAllAsRead(userId: string) {
        return this.prisma.notification.updateMany({
            where: { userId, read: false },
            data: { read: true, readAt: new Date() },
        });
    }

    async getUnreadCount(userId: string): Promise<number> {
        return this.prisma.notification.count({
            where: {
                userId,
                read: false,
                archived: false,
            },
        });
    }

    async archive(id: string, userId: string) {
        return this.update(id, userId, { archived: true });
    }

    async delete(id: string, userId: string) {
        return this.prisma.notification.deleteMany({
            where: { id, userId },
        });
    }
}
