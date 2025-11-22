import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskPriority, TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  list(eventId: string) {
    return this.prisma.task.findMany({
      where: { eventId },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(eventId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        eventId,
        title: dto.title,
        description: dto.description,
        priority: (dto.priority ?? 'MEDIUM') as TaskPriority,
        dueAt: dto.dueAt ? new Date(dto.dueAt) : undefined,
        stageId: dto.stageId,
      },
    });
  }

  async updateStatus(eventId: string, id: string, dto: UpdateTaskStatusDto) {
    const existing = await this.prisma.task.findFirst({
      where: { id, eventId },
    });
    if (!existing) throw new NotFoundException('Task not found');
    return this.prisma.task.update({
      where: { id },
      data: { status: dto.status as TaskStatus },
    });
  }
}
