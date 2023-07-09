import { ReviewRepository } from "../ports/review-repository.ts";

export interface AverageRatingInput {
  productUpc: string;
}

export interface AverageRatingResult {
  averageRating: number | null;
}

export class AverageRating {
  private readonly reviewRepository: ReviewRepository;

  public constructor(options: { reviewRepository: ReviewRepository }) {
    this.reviewRepository = options.reviewRepository;
  }

  public async handler(input: AverageRatingInput) {
    const reviews = await this.reviewRepository.findReviewsByProductUpc(
      input.productUpc
    );
    const averageRating =
      reviews.length === 0
        ? null
        : reviews
            .map((review) => review.rating)
            .reduce((sum, rating) => sum + rating, 0) / reviews.length;
    return {
      averageRating,
    };
  }
}
