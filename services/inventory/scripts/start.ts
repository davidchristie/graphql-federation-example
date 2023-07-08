import { inventoryPort } from "dev-config";
import { startServer } from "server-config";
import { createInventoryServer } from "../graphql/server.ts";

async function start(): Promise<void> {
  const inventoryServer = createInventoryServer();
  await startServer(inventoryServer, inventoryPort);
}

start();
