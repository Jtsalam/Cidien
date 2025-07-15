import { PrismaClient } from './lib/generated/prisma/index.js';
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to DB:", process.env.DATABASE_URL);
    const tables = await prisma.$queryRawUnsafe(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
    console.log("Tables in public schema:", tables);

    const bedInfoCount = await prisma.bed_info.count();
    console.log("bed_info row count:", bedInfoCount);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
