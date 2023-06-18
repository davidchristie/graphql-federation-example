import { Box } from "@chakra-ui/react";
import { NavBar } from "./nav-bar";
import { ReactNode } from "react";

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
