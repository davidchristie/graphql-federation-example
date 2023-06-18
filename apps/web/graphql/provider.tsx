import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export interface GraphQLProviderProps {
  children?: ReactNode;
}

export function GraphQLProvider({
  children,
}: GraphQLProviderProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
