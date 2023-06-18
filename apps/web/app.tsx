import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/nav-bar";
import { HomePage } from "./pages/home";
import { SignInPage } from "./pages/sign-in";
import { homePath, signInPath } from "./paths";
import { PageLayout } from "./components/page-layout";
import { NotFoundPage } from "./pages/not-found";

export function App(): JSX.Element {
  return (
    <PageLayout>
      <Routes>
        <Route element={<HomePage />} path={homePath} />
        <Route element={<SignInPage />} path={signInPath} />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </PageLayout>
  );
}
