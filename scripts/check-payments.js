// scripts/check-payments.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });
  console.log('Recent payments:', payments);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
