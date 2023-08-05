import {
  CreateReviewInput,
  useCreateReviewMutation,
} from "../../../generated/graphql.ts";

export type CreateReview = (input: CreateReviewInput) => Promise<void>;

export function useCreateReview(): CreateReview {
  const [createReviewMutation] = useCreateReviewMutation();
  return async (input: CreateReviewInput) => {
    await createReviewMutation({
      variables: {
        productUpc: input.productUpc,
        rating: input.rating,
        body: input.body,
      },
    });
  };
}
