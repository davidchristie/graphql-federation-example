import { reviewsPort } from "dev-config";
import { startServer } from "server-config";
import { createMockReviewsApp } from "../main.ts";
import { createReviewsServer } from "../graphql/server.ts";

async function start(): Promise<void> {
  const reviewsServer = createReviewsServer(createMockReviewsApp());
  await startServer(reviewsServer, reviewsPort);
}

start();
