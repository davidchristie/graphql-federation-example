import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { GraphQLProvider } from "./graphql/provider";

export function renderApp(): void {
  const container = document.getElementById("root");
  if (container === null) {
    throw new Error("Root container not found");
  }
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <ChakraProvider>
        <GraphQLProvider>
          <App />
        </GraphQLProvider>
      </ChakraProvider>
    </StrictMode>
  );
}
