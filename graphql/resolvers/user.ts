import { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export const userResolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany({
        select: { id: true, name: true, email: true, phone_number: true, role: true },
      }) ?? [];
    },
    user: async (_: unknown, { id }: { id: string }) => {
      return await prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, phone_number: true, role: true },
      });
    },
  },
  Mutation: {
    updateUser: async (_: unknown, { id, name, role }: { id: string; name?: string; role?: Role }) => {
      return await prisma.user.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(role && { role }),
        },
      });
    },
  },
};

