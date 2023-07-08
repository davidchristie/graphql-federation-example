import { inventoryPort } from "dev-config";
import { startServer } from "server-config";
import { createInventoryServer } from "../graphql/server.ts";

const inventoryServer = createInventoryServer();

await startServer(inventoryServer, inventoryPort);
