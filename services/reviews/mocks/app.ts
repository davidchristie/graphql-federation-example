import { InMemoryReviewRepository } from "../adapters/in-memory-review-repository.js";
import { ReviewsApp, createReviewsApp } from "../graphql/app.js";
import { mockReviews } from "./reviews.js";

export function createMockReviewsApp(): ReviewsApp {
  return createReviewsApp({
    ports: {
      reviewRepository: new InMemoryReviewRepository(mockReviews),
    },
  });
}
