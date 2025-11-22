import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventType } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.event.findMany({ orderBy: { startAt: 'desc' } });
  }

  async get(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        stages: true,
        tasks: { orderBy: { createdAt: 'desc' }, take: 50 },
        scheduleItems: { orderBy: { startAt: 'asc' } },
      },
    });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  create(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        name: dto.name,
        type: dto.type as EventType,
        startAt: new Date(dto.startAt),
        endAt: new Date(dto.endAt),
        location: dto.location,
      },
    });
  }
}
