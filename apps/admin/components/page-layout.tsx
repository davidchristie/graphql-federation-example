import { ReactNode } from "react";
import { NavBar } from "./nav-bar.tsx";
import { Box } from "@mui/material";

export interface PageLayoutProps {
  children?: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps): JSX.Element {
  return (
    <div>
      <NavBar />
      <Box paddingX={4} paddingY={12}>
        {children}
      </Box>
    </div>
  );
}
