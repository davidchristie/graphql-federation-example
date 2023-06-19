import { Box, CircularProgress, Text } from "@chakra-ui/react";
import { ProductList } from "../features/products/components/product-list";
import { useProducts } from "../features/products/hooks/use-products";

export function HomePage(): JSX.Element {
  const products = useProducts();
  return (
    <Box>
      {products.isLoading && <CircularProgress isIndeterminate />}
      {products.data && <ProductList products={products.data} />}
      {products.error && <Text>{products.error.message}</Text>}
    </Box>
  );
}
