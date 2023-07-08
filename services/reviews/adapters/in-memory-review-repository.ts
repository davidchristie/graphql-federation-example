import { Review } from "../core/entities/review.ts";
import { ReviewRepository } from "../core/ports/review-repository.ts";

export class InMemoryReviewRepository implements ReviewRepository {
  private readonly reviews: Review[];

  public constructor(reviews: Review[] = []) {
    this.reviews = [...reviews];
  }

  public async findReviewById(id: string): Promise<Review | null> {
    return this.reviews.find((review) => review.id === id) ?? null;
  }

  public async findReviewsByProductUpc(productUpc: string): Promise<Review[]> {
    return this.reviews.filter((review) => review.productUpc === productUpc);
  }

  public async findReviewsByAuthorId(authorId: string): Promise<Review[]> {
    return this.reviews.filter((review) => review.authorId === authorId);
  }
}
