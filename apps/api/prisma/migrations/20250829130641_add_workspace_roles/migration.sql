/*
  Warnings:

  - The `role` column on the `WorkspaceMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[workspaceId,userId]` on the table `WorkspaceMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."WorkspaceRole" AS ENUM ('DIRECTOR', 'MANAGER', 'LEAD', 'STAFF');

-- AlterTable
ALTER TABLE "public"."WorkspaceMember" DROP COLUMN "role",
ADD COLUMN     "role" "public"."WorkspaceRole" NOT NULL DEFAULT 'STAFF';

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceMember_workspaceId_userId_key" ON "public"."WorkspaceMember"("workspaceId", "userId");
