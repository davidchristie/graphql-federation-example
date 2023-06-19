import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import { GatewayProvider } from "./providers/gateway";

export function renderApp(): void {
  const container = document.getElementById("root");
  if (container === null) {
    throw new Error("Root container not found");
  }
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <ChakraProvider>
          <GatewayProvider>
            <App />
          </GatewayProvider>
        </ChakraProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
