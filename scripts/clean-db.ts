import { prisma } from '../lib/prisma';

async function main() {
  const items  = await prisma.orderItem.deleteMany({});
  const orders = await prisma.order.deleteMany({});
  const users  = await prisma.user.deleteMany({ where: { role: 'CUSTOMER' } });
  console.log(`Deleted: ${items.count} order items, ${orders.count} orders, ${users.count} users`);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
