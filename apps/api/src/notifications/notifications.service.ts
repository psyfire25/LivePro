'use client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FilterNotificationsDto } from './dto/filter-notifications.dto';
import * as webpush from 'web-push';

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

interface WebPushError extends Error {
  statusCode: number;
}

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {
    // Configure web-push with VAPID keys
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

    if (vapidPublicKey && vapidPrivateKey) {
      webpush.setVapidDetails(
        'mailto:support@livepro.app',
        vapidPublicKey,
        vapidPrivateKey,
      );
    }
  }

  async create(dto: CreateNotificationDto) {
    const notification = await this.prisma.notification.create({
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

    // Send push notification to all subscribed devices
    await this.sendPushNotification(dto.userId, {
      title: dto.title,
      body: dto.message,
      data: {
        notificationId: notification.id,
        actionUrl: dto.actionUrl,
      },
    });

    return notification;
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

  // Push notification methods
  async subscribeToPush(userId: string, subscription: PushSubscription) {
    return this.prisma.pushSubscription.upsert({
      where: { endpoint: subscription.endpoint },
      create: {
        userId,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
      update: {
        userId,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
    });
  }

  async unsubscribeFromPush(endpoint: string) {
    return this.prisma.pushSubscription.delete({
      where: { endpoint },
    });
  }

  async sendPushNotification(
    userId: string,
    payload: { title: string; body: string; data?: Record<string, unknown> },
  ) {
    const subscriptions = await this.prisma.pushSubscription.findMany({
      where: { userId },
    });

    const pushPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      icon: '/icon-192.png',
      badge: '/badge-72.png',
      data: payload.data || {},
    });

    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: {
                p256dh: sub.p256dh,
                auth: sub.auth,
              },
            },
            pushPayload,
          );
        } catch (err) {
          const error = err as WebPushError;
          // If subscription is invalid, remove it
          if (error.statusCode === 410) {
            await this.unsubscribeFromPush(sub.endpoint);
          }
          throw error;
        }
      }),
    );

    return results;
  }

  getVapidPublicKey() {
    return process.env.VAPID_PUBLIC_KEY;
  }
}
