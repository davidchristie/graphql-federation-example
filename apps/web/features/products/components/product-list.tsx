import { SimpleGrid } from "@chakra-ui/react";
import { ProductSummary } from "../types/product-summary";
import { ProductCard } from "./product-card";

export interface ProductListProps {
  products: ProductSummary[];
}

export function ProductList({ products }: ProductListProps): JSX.Element {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }}>
      {products.map((product) => (
        <ProductCard key={product.upc} product={product} />
      ))}
    </SimpleGrid>
  );
}
