import { reviewsPort } from "dev-config";
import { startServer } from "server-config";
import { createMockReviewsApp } from "../main.js";
import { createReviewsServer } from "../graphql/server.js";

const reviewsServer = createReviewsServer(createMockReviewsApp());

await startServer(reviewsServer, reviewsPort);
