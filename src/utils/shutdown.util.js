import prisma from "../config/prisma.config.js";

export default async function (signal) {
  console.log(`\nReceive ${signal} , shutting down...`);
  try {
    await prisma.$disconnect();
    console.log("Prisma disconnect");
  } catch (error) {
    console.log("Error whn disconnect");
  } finally {
    process.exit(0);
  }
}
