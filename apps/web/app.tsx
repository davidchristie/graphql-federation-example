import { Box, CircularProgress } from "@chakra-ui/react";
import { ProductList } from "./features/products/components/product-list";
import { useProducts } from "./features/products/hooks/use-products";

export function App(): JSX.Element {
  const products = useProducts();
  return (
    <Box>
      {products.isLoading && <CircularProgress />}
      {products.data && (
        <ProductList
          products={products.data?.flatMap((product) =>
            product === null ? [] : [product]
          )}
        />
      )}
    </Box>
  );
}
