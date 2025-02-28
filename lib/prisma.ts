// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Permite reusar la instancia en modo de desarrollo (hot reload)
  // y evita múltiples instancias en producción.
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // Opcional, para ver las queries
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
