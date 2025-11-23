import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { CreateStaffingRequestDto } from './dto/create-staffing-request.dto';

@Injectable()
export class StaffingService {
  constructor(private prisma: PrismaService) {}

  async getRoster() {
    return this.prisma.user.findMany({
      include: {
        shifts: true,
      },
    });
  }

  async getShifts(userId?: string, eventId?: string) {
    return this.prisma.shift.findMany({
      where: {
        userId,
        eventId,
      },
      include: {
        user: true,
        event: true,
      },
    });
  }

  async createShift(data: CreateShiftDto) {
    return this.prisma.shift.create({
      data: {
        userId: data.userId,
        eventId: data.eventId,
        startAt: new Date(data.startAt),
        endAt: new Date(data.endAt),
        role: data.role,
        notes: data.notes,
      },
    });
  }

  async getRequests() {
    return this.prisma.staffingRequest.findMany({
      include: {
        event: true,
      },
    });
  }

  async createRequest(data: CreateStaffingRequestDto) {
    return this.prisma.staffingRequest.create({
      data,
    });
  }
}
