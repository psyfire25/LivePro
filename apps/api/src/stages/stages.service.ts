import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStageDto } from './dto/create-stage.dto';

@Injectable()
export class StagesService {
  constructor(private prisma: PrismaService) {}

  list(eventId: string) {
    return this.prisma.stage.findMany({
      where: { eventId },
      orderBy: { name: 'asc' },
    });
  }

  create(eventId: string, dto: CreateStageDto) {
    return this.prisma.stage.create({
      data: {
        eventId,
        name: dto.name,
        notes: dto.notes,
      },
    });
  }
}
