import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WorkspacesService {
  constructor(private prisma: PrismaService) {}

  getMembership(workspaceId: string, userId: string) {
    return this.prisma.workspaceMember.findUnique({
      where: { workspaceId_userId: { workspaceId, userId } },
    });
  }

  upsertMember(workspaceId: string, userId: string, role: string) {
    return this.prisma.workspaceMember.upsert({
      where: { workspaceId_userId: { workspaceId, userId } },
      update: { role: role as any },
      create: { workspaceId, userId, role: role as any },
    });
  }
}
