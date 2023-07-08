import { Review } from "../core/entities/review.ts";

export const mockReviews: Review[] = [
  { id: "1", authorId: "1", productUpc: "1", body: "Love it!", rating: 5 },
  {
    id: "2",
    authorId: "1",
    productUpc: "2",
    body: "Too expensive.",
    rating: 4,
  },
  {
    id: "3",
    authorId: "2",
    productUpc: "3",
    body: "Could be better.",
    rating: 3,
  },
  {
    id: "4",
    authorId: "2",
    productUpc: "1",
    body: "Prefer something else.",
    rating: 2,
  },
];
