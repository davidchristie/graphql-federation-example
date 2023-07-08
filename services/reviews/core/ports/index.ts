import { ReviewRepository } from "./review-repository.ts";

export interface Ports {
  reviewRepository: ReviewRepository;
}
