import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  concat,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode } from "react";
import { getToken } from "../storage.ts";

const httpLink = createHttpLink({
  uri: "/gateway/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

export interface GatewayProviderProps {
  children?: ReactNode;
}

export function GatewayProvider({ children }: GatewayProviderProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
