import { reviewsPort } from "dev-config";
import { startServer } from "server-config";
import { createMockReviewsApp } from "../main.ts";
import { createReviewsServer } from "../graphql/server.ts";

const reviewsServer = createReviewsServer(createMockReviewsApp());

await startServer(reviewsServer, reviewsPort);
