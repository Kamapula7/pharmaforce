import { PrismaClient } from '../app/generated/prisma/client.ts';
import { PrismaNeon } from '@prisma/adapter-neon';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const items  = await prisma.orderItem.deleteMany({});
const orders = await prisma.order.deleteMany({});
const users  = await prisma.user.deleteMany({ where: { role: 'CUSTOMER' } });

console.log(`Deleted: ${items.count} order items, ${orders.count} orders, ${users.count} users`);
await prisma.$disconnect();
