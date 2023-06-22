import { Server, createServer } from "server-config";
import { ReviewsApp } from "./app.js";

export function createReviewsServer(reviewsApp: ReviewsApp): Server {
  return createServer(reviewsApp);
}
