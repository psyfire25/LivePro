import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateScheduleItemDto } from './dto/create-schedule-item.dto';
import { UpdateScheduleItemDto } from './dto/update-schedule-item.dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  list(eventId: string) {
    return this.prisma.scheduleItem.findMany({
      where: { eventId },
      orderBy: [{ startAt: 'asc' }],
    });
  }

  create(eventId: string, dto: CreateScheduleItemDto) {
    return this.prisma.scheduleItem.create({
      data: {
        eventId,
        title: dto.title,
        kind: dto.kind as any,
        startAt: new Date(dto.startAt),
        endAt: new Date(dto.endAt),
        stageId: dto.stageId,
        notes: dto.notes,
        artist: dto.artist,
      },
    });
  }

  async update(eventId: string, id: string, dto: UpdateScheduleItemDto) {
    const existing = await this.prisma.scheduleItem.findFirst({
      where: { id, eventId },
    });
    if (!existing) throw new NotFoundException('Schedule item not found');
    return this.prisma.scheduleItem.update({
      where: { id },
      data: {
        ...dto,
        startAt: dto.startAt ? new Date(dto.startAt) : undefined,
        endAt: dto.endAt ? new Date(dto.endAt) : undefined,
      } as any,
    });
  }

  async remove(eventId: string, id: string) {
    const existing = await this.prisma.scheduleItem.findFirst({
      where: { id, eventId },
    });
    if (!existing) throw new NotFoundException('Schedule item not found');
    await this.prisma.scheduleItem.delete({ where: { id } });
    return { ok: true };
  }
}
