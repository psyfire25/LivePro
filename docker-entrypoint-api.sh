#!/bin/sh
set -e

echo "Running Prisma migrations..."
cd /app
pnpm --filter api exec prisma db push

echo "Starting NestJS API..."
exec node /app/apps/api/dist/src/main.js
