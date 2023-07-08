import { Review } from "../entities/review.ts";
import { ReviewRepository } from "../ports/review-repository.ts";

export interface FindReviewsByProductUpcInput {
  productUpc: string;
}

export interface FindReviewsByProductUpcResult {
  reviews: Review[];
}

export class FindReviewsByProductUpc {
  private readonly reviewRepository: ReviewRepository;

  public constructor(options: { reviewRepository: ReviewRepository }) {
    this.reviewRepository = options.reviewRepository;
  }

  public async handler(
    input: FindReviewsByProductUpcInput
  ): Promise<FindReviewsByProductUpcResult> {
    const reviews = await this.reviewRepository.findReviewsByProductUpc(
      input.productUpc
    );
    return {
      reviews,
    };
  }
}
