import { useParams } from "react-router-dom";
import { ProductDetails } from "../features/products/components/product-details.tsx";
import { useProduct } from "../features/products/hooks/use-product.ts";
import { productUpcParam } from "../paths.ts";
import { LoadingPage } from "./loading.tsx";
import { NotFoundPage } from "./not-found.tsx";

export function ProductPage(): JSX.Element {
  const { [productUpcParam]: productUpc } = useParams();
  const product = useProduct({ upc: productUpc ?? "" });
  if (product.isLoading) {
    return <LoadingPage />;
  }
  if (product.data === undefined) {
    return <NotFoundPage />;
  }
  return <ProductDetails product={product.data} />;
}
