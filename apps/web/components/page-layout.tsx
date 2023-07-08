import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import { NavBar } from "./nav-bar.tsx";

export interface PageLayoutProps {
  children?: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps): JSX.Element {
  return (
    <Box minHeight="100%">
      <NavBar />
      {children}
    </Box>
  );
}
