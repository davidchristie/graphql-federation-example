import { Review } from "../entities/review.js";
import { ReviewRepository } from "../ports/review-repository.js";

export interface FindReviewsByAuthorIdInput {
  authorId: string;
}

export interface FindReviewsByAuthorIdResult {
  reviews: Review[];
}

export class FindReviewsByAuthorId {
  private readonly reviewRepository: ReviewRepository;

  public constructor(options: { reviewRepository: ReviewRepository }) {
    this.reviewRepository = options.reviewRepository;
  }

  public async handler(
    input: FindReviewsByAuthorIdInput
  ): Promise<FindReviewsByAuthorIdResult> {
    const reviews = await this.reviewRepository.findReviewsByAuthorId(
      input.authorId
    );
    return {
      reviews,
    };
  }
}
