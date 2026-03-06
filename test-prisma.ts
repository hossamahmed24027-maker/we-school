import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

console.log("DATABASE_URL from env:", process.env.DATABASE_URL);

const connectionString = process.env.DATABASE_URL || "mysql://root@localhost:3306/school";
const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

async function test() {
    try {
        console.log("Connecting to database...");
        await prisma.$connect();
        console.log("Connected successfully!");
        const tables = await prisma.$queryRaw`SHOW TABLES`;
        console.log("Tables found:", tables);
    } catch (err) {
        console.error("Connection failed:", err);
    } finally {
        await prisma.$disconnect();
    }
}

test();
