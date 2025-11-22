import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpsertWorkspaceMemberDto } from './dto/upsert-workspace-member.dto';
import { WorkspaceRole } from '@prisma/client';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private svc: WorkspacesService) { }

  @Get(':workspaceId/members/:userId')
  getMembership(
    @Param('workspaceId') ws: string,
    @Param('userId') userId: string,
  ) {
    return this.svc.getMembership(ws, userId);
  }

  @Post(':workspaceId/members')
  upsert(
    @Param('workspaceId') ws: string,
    @Body() body: UpsertWorkspaceMemberDto,
  ) {
    // body.role is now typed as WorkspaceRole, which matches the service
    return this.svc.upsertMember(ws, body.userId, body.role);
  }

  @Get()
  list() {
    return this.svc.list();
  }

  @Post()
  create(@Body() dto: CreateWorkspaceDto) {
    return this.svc.create(dto);
  }
}