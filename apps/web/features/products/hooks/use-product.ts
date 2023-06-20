import { useProductQuery } from "../../../generated/graphql";
import { ProductDetails } from "../types/product-details";

export interface ProductResult {
  isLoading: boolean;
  data: ProductDetails | undefined;
  error: Error | undefined;
}

export function useProduct({ upc }: { upc: string }): ProductResult {
  const result = useProductQuery({
    variables: {
      upc,
    },
  });
  return {
    isLoading: result.loading,
    data: result.data?.product ?? undefined,
    error: result.error,
  };
}
