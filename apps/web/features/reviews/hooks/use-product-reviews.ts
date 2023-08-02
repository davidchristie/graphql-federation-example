import { useProductReviewsQuery } from "../../../generated/graphql.ts";
import { ReviewSummary } from "../types/review-summary.ts";

export interface ProductReviewsResult {
  isLoading: boolean;
  data: ReviewSummary | undefined;
  error: Error | undefined;
}

export function useProductReviews(input: { upc: string }) {
  const result = useProductReviewsQuery({
    variables: {
      upc: input.upc,
    },
  });
  return {
    isLoading: result.loading,
    data: result.data?.product?.reviews,
    error: result.error,
  };
}
