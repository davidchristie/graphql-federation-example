import { authSecret } from "dev-config";
import { InMemoryReviewRepository } from "../adapters/in-memory-review-repository.ts";
import { ReviewsApp, createReviewsApp } from "../graphql/app.ts";
import { mockReviews } from "./reviews.ts";

export function createMockReviewsApp(): ReviewsApp {
  return createReviewsApp({
    ports: {
      reviewRepository: new InMemoryReviewRepository(mockReviews),
    },
    auth: {
      publicKeyOrSecret: authSecret,
    },
  });
}
