import { reviewsPort } from "dev-config";
import { startServer } from "server-config";
import { createReviewsServer } from "../graphql/server.js";

const reviewsServer = createReviewsServer();

await startServer(reviewsServer, reviewsPort);
