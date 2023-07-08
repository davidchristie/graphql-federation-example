import { Review } from "../entities/review.ts";
import { ReviewRepository } from "../ports/review-repository.ts";

export interface FindReviewByIdInput {
  id: string;
}

export interface FindReviewByIdResult {
  review: Review | null;
}

export class FindReviewById {
  private readonly reviewRepository: ReviewRepository;

  public constructor(options: { reviewRepository: ReviewRepository }) {
    this.reviewRepository = options.reviewRepository;
  }

  public async handler(
    input: FindReviewByIdInput
  ): Promise<FindReviewByIdResult> {
    const review = await this.reviewRepository.findReviewById(input.id);
    return {
      review,
    };
  }
}
