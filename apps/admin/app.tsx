import { Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/page-layout.tsx";
import { HomePage } from "./pages/home.tsx";
import { NotFoundPage } from "./pages/not-found.tsx";
import { homePath } from "./paths.ts";

export function App(): JSX.Element {
  return (
    <PageLayout>
      <Routes>
        <Route element={<HomePage />} path={homePath} />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </PageLayout>
  );
}
