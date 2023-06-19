import { useProductsQuery } from "../../../generated/graphql";
import { ProductSummary } from "../types/product-summary";

export interface ProductsResult {
  isLoading: boolean;
  data: ProductSummary[] | undefined;
  error: Error | undefined;
}

export function useProducts(): ProductsResult {
  const result = useProductsQuery();
  return {
    isLoading: result.loading,
    data: result.data?.products.flatMap((product) =>
      product ? [product] : []
    ),
    error: result.error,
  };
}
