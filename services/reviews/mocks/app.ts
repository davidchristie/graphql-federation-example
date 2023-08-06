import { authSecret, seedReviews } from "dev-config";
import { InMemoryReviewRepository } from "../adapters/in-memory-review-repository.ts";
import { ReviewsApp, createReviewsApp } from "../graphql/app.ts";

export function createMockReviewsApp(): ReviewsApp {
  return createReviewsApp({
    ports: {
      reviewRepository: new InMemoryReviewRepository(seedReviews),
    },
    auth: {
      publicKeyOrSecret: authSecret,
    },
  });
}
