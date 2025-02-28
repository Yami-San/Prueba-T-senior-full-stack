import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import { useEffect } from "react";


function RefreshSession() {
  const { update } = useSession();

  useEffect(() => {
    update(); // Fuerza la actualización de la sesión al montar el componente
  }, []);

  return null;
}

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
