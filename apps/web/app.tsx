import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { SignInPage } from "./pages/sign-in";
import { homePath, productUpcParam, productPath, signInPath } from "./paths";
import { PageLayout } from "./components/page-layout";
import { NotFoundPage } from "./pages/not-found";
import { ProductPage } from "./pages/product";

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
