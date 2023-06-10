import { Server, createServer } from "server-config";
import { createInventoryApp } from "./app.js";

export function createInventoryServer(): Server {
  return createServer(createInventoryApp());
}
