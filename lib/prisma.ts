import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('[Prisma] DATABASE_URL is not set');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new (PrismaClient as any)();
  }
  const adapter = new PrismaNeon({ connectionString });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new (PrismaClient as any)({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Cache in production too — reuse connection across warm invocations
globalForPrisma.prisma = prisma;
