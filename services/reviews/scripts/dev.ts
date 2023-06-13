import { startServer } from "server-config";
import { createReviewsServer } from "../graphql/server.js";

const port = 4004;
const reviewsServer = createReviewsServer();

await startServer(reviewsServer, port);
