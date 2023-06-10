import { Server, createServer } from "server-config";
import { createProductsApp } from "./app.js";

export function createProductsServer(): Server {
  return createServer(createProductsApp());
}
