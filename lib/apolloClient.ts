import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = () => {
  return new ApolloClient({
    uri: 'https://prueba-t-senior-full-stack.vercel.app/api/graphql', // Cambia esto si usas Vercel u otro hosting
    cache: new InMemoryCache(),
  });
};
