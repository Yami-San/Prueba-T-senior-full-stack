import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/graphql/typeDefs';
import { getServerSession } from "next-auth/next";
import { resolvers } from '@/graphql/resolvers';
import { authOptions } from './auth/[...nextauth]';
import { MyContext } from '@/graphql/context';
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  export default startServerAndCreateNextHandler(server, {
    context: async (req, res) => {
      const session = await getServerSession(req, res, authOptions);
      return {
        user: session?.user
          ? { id: session.user.id, name: session.user.name }
          : undefined,
      } as MyContext; // <-- Forzamos el cast
    },
  });
