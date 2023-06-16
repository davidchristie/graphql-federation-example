import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { StrictMode } from "react";

export function renderApp(): void {
  const container = document.getElementById("root");
  if (container === null) {
    throw new Error("Root container not found");
  }
  const root = createRoot(container);
  const queryClient = new QueryClient();
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
}
