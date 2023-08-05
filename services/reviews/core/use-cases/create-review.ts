import { SignedInUser } from "auth-config";
import { randomUUID } from "node:crypto";
import { ReviewRepository } from "../ports/review-repository.ts";
import { Review } from "../entities/review.ts";

export interface CreateReviewInput {
  signedInUser: SignedInUser | null;
  productUpc: string;
  body?: string;
  rating: number;
}

export interface CreateReviewResult {
  review: Review;
}

export class CreateReview {
  private readonly reviewRepository: ReviewRepository;

  public constructor(options: { reviewRepository: ReviewRepository }) {
    this.reviewRepository = options.reviewRepository;
  }

  public async handler(input: CreateReviewInput): Promise<CreateReviewResult> {
    if (input.signedInUser === null) {
      throw new Error("Must be signed in");
    }
    const review: Review = {
      id: randomUUID(),
      productUpc: input.productUpc,
      authorId: input.signedInUser.id,
      body: input.body ?? "",
      rating: input.rating,
    };
    await this.reviewRepository.createReview(review);
    return {
      review,
    };
  }
}
