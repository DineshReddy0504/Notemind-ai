import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient instance across the app (and across hot
// reloads in dev) to avoid exhausting the database's connection pool.
export const prisma = new PrismaClient();
