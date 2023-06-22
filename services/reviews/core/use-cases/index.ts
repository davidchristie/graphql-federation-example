import { Ports } from "../ports/index.js";
import { FindReviewById } from "./find-review-by-id.js";
import { FindReviewsByAuthorId } from "./find-reviews-by-author-id.js";
import { FindReviewsByProductUpc } from "./find-reviews-by-product-upc.js";

export interface UseCases {
  findReviewById: FindReviewById;
  findReviewsByAuthorId: FindReviewsByAuthorId;
  findReviewsByProductUpc: FindReviewsByProductUpc;
}

export function createUseCases(options: { ports: Ports }): UseCases {
  return {
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
