import { Review } from "../entities/review.js";

export interface ReviewRepository {
  findReviewById(id: string): Promise<Review | null>;
  findReviewsByProductUpc(productUpc: string): Promise<Review[]>;
  findReviewsByAuthorId(authorId: string): Promise<Review[]>;
}
