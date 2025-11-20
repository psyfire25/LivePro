import { execSync } from 'child_process';
import path from 'path';
import dotenv from 'dotenv';

export default async function globalSetup() {
  // Load environment variables from the app's .env so Prisma has DATABASE_URL
  dotenv.config({ path: path.resolve(__dirname, '../.env') });

  // Push Prisma schema to the database so tables exist for tests
  try {
    console.log('Running `prisma db push` to ensure schema is present...');
    execSync('npx prisma db push --accept-data-loss', {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
      env: process.env,
    });
  } catch (err) {
    console.error('Failed to run prisma db push:', err);
    throw err;
  }
}
