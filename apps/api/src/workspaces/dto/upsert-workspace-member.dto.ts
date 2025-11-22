// src/workspaces/dto/upsert-workspace-member.dto.ts
import { WorkspaceRole } from '@prisma/client';

export class UpsertWorkspaceMemberDto {
    userId: string;
    role: WorkspaceRole;
}