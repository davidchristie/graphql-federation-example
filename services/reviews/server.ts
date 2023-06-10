import { Server, createServer } from "server-config";
import { createReviewsApp } from "./app.js";

export function createReviewsServer(): Server {
  return createServer(createReviewsApp());
}
