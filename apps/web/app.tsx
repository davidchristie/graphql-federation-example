import { Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/page-layout.tsx";
import { HomePage } from "./pages/home.tsx";
import { NotFoundPage } from "./pages/not-found.tsx";
import { ProductPage } from "./pages/product.tsx";
import { SignInPage } from "./pages/sign-in.tsx";
import { homePath, productPath, productUpcParam, signInPath } from "./paths.ts";

export function App(): JSX.Element {
  return (
    <PageLayout>
      <Routes>
        <Route element={<HomePage />} path={homePath} />
        <Route
          element={<ProductPage />}
          path={productPath(":" + productUpcParam)}
        />
        <Route element={<SignInPage />} path={signInPath} />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </PageLayout>
  );
}
