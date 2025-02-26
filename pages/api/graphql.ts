import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '@/graphql/typeDefs';
import { gql } from 'graphql-tag';
import { resolvers } from '@/graphql/resolvers';

const users = [{ name: 'Foo Bar', username: 'foobar' }];


const server = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(server);
