import { Ports } from "../ports/index.ts";
import { AverageRating } from "./average-rating.ts";
import { FindReviewById } from "./find-review-by-id.ts";
import { FindReviewsByAuthorId } from "./find-reviews-by-author-id.ts";
import { FindReviewsByProductUpc } from "./find-reviews-by-product-upc.ts";

export interface UseCases {
  averageRating: AverageRating;
  findReviewById: FindReviewById;
  findReviewsByAuthorId: FindReviewsByAuthorId;
  findReviewsByProductUpc: FindReviewsByProductUpc;
}

export function createUseCases(options: { ports: Ports }): UseCases {
  return {
    averageRating: new AverageRating({
      reviewRepository: options.ports.reviewRepository,
    }),
    findReviewById: new FindReviewById({
      reviewRepository: options.ports.reviewRepository,
    }),
    findReviewsByAuthorId: new FindReviewsByAuthorId({
      reviewRepository: options.ports.reviewRepository,
    }),
    findReviewsByProductUpc: new FindReviewsByProductUpc({
      reviewRepository: options.ports.reviewRepository,
    }),
  };
}
