import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private svc: WorkspacesService) { }

  @Get(':workspaceId/members/:userId')
  getMembership(@Param('workspaceId') ws: string, @Param('userId') userId: string) {
    return this.svc.getMembership(ws, userId);
  }

  @Post(':workspaceId/members')
  upsert(@Param('workspaceId') ws: string, @Body() body: { userId: string; role: string }) {
    return this.svc.upsertMember(ws, body.userId, body.role);
  }

  @Get()
  list() {
    return this.svc.list();
  }

  @Post()
  create(@Body() dto: { name: string; slug: string }) {
    return this.svc.create(dto);
  }
}
