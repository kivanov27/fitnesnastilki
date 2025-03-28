import { PrismaClient } from '@prisma/client'

// 1. Declare a global variable to store Prisma client
declare global {
  var prisma: PrismaClient | undefined // TypeScript declaration
}

// 2. Check if we already have a Prisma instance
//    If not, create a new one
const prisma = globalThis.prisma || new PrismaClient();

// 3. In development, reuse the same instance
//    (Prevents duplicate clients during hot reload)
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
