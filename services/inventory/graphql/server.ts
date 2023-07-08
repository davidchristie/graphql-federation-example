import { Server, createServer } from "server-config";
import { createInventoryApp } from "./app.ts";

export function createInventoryServer(): Server {
  return createServer(createInventoryApp());
}
