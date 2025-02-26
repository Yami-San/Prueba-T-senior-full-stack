import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import { supabase } from "@/lib/supabase";

const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    mail: String!
    phone_number: String!
    rol: String!
  }

  type Transaction {
    id: ID!
    userID: ID!
    
  }
`;

const users = [{ name: 'Foo Bar', username: 'foobar' }];

const resolvers = {
  Query: {
    users() {
      return users;
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server);
