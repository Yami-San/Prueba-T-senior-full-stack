import { userResolvers } from "./user";
import { transactionResolvers } from "./transaction";

export const resolvers = {
  Query: {
    ...userResolvers.Query, ...transactionResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation, ...transactionResolvers.Mutation,
  },
};