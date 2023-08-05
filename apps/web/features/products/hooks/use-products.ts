import { ProductsInput, useProductsQuery } from "../../../generated/graphql.ts";
import { ProductSummary } from "../types/product-summary.ts";

export interface ProductsResult {
  isLoading: boolean;
  data: ProductSummary[] | undefined;
  error: Error | undefined;
}

export function useProducts(input: ProductsInput = {}): ProductsResult {
  const result = useProductsQuery({
    variables: {
      input,
    },
  });
  return {
    isLoading: result.loading,
    data: result.data?.products.flatMap((product) =>
      product ? [product] : []
    ),
    error: result.error,
  };
}
