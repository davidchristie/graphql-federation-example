import { startServer } from "server-config";
import { createReviewsServer } from "../server.js";

const port = 4004;
const reviewsServer = createReviewsServer();

await startServer(reviewsServer, port);
