import { useParams } from "react-router-dom";
import { ProductDetails } from "../features/products/components/product-details";
import { useProduct } from "../features/products/hooks/use-product";
import { productUpcParam } from "../paths";
import { LoadingPage } from "./loading";
import { NotFoundPage } from "./not-found";

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
