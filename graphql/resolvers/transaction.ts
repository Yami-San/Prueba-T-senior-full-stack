import { PrismaClient } from "@prisma/client";
import { MyContext } from "@/graphql/context";

const prisma = new PrismaClient();

export const transactionResolvers = {
  Query: {
    transactions: async () => {
      return await prisma.transactions.findMany({
        select: { id: true, amount: true, description: true, date: true, user: { select: { id: true, name: true, email: true, phone_number: true } } },
      }) ?? [];
    },
    transaction: async (_: unknown, { id }: { id: string }) => {
      return await prisma.transactions.findUnique({
        where: { id },
        select: { id: true, amount: true, description: true, date: true },
      });
    },
  },
  Mutation: {
    createTransaction: async (
      _: any,
      { amount, description, date }: { amount: number; description: string; date: string },
      context: MyContext
    ) => {
      if (!context.user?.id) {
        throw new Error("Usuario no autenticado");
      }
      return await prisma.transactions.create({
        data: {
          userId: context.user.id,
          amount,
          description,
          date: new Date(date),
        },
        select: { id: true, amount: true, description: true, date: true },
      });
    },
  },
};
