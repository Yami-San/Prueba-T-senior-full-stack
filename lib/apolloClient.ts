import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://localhost:3000/api/graphql', // Cambia esto si usas Vercel u otro hosting
    cache: new InMemoryCache(),
  });
};
