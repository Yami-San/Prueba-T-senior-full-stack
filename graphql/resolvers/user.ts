import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const userResolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany({
        select: { id: true, name: true, email: true, phone_number: true, role: true },
      });
    },
    user: async (_: any, { id }: { id: string }) => {
      return await prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, phone_number: true, role: true },
      });
    },
  },
  Mutation: {
    updateUser: async (_: any, { id, name, role }: { id: string; name?: string; role?: Role }) => {
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

