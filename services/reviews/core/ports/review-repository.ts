import { Review } from "../entities/review.ts";

export interface ReviewRepository {
  createReview(review: Review): Promise<void>;
  findReviewById(id: string): Promise<Review | null>;
  findReviewsByProductUpc(productUpc: string): Promise<Review[]>;
  findReviewsByAuthorId(authorId: string): Promise<Review[]>;
}
