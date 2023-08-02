import CssBaseline from "@mui/material/CssBaseline";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app.tsx";
import { GatewayProvider } from "./providers/gateway.tsx";

export function renderApp(): void {
  const container = document.getElementById("root");
  if (container === null) {
    throw new Error("Root container not found");
  }
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <>
          <CssBaseline />
          <GatewayProvider>
            <App />
          </GatewayProvider>
        </>
      </BrowserRouter>
    </StrictMode>
  );
}
