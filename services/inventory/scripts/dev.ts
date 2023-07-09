import { inventoryPort } from "dev-config";
import { startServer } from "server-config";
import { createInventoryServer } from "../graphql/server.ts";
import { createMockInventoryApp } from "../mocks/app.ts";

const inventoryServer = createInventoryServer(createMockInventoryApp());

await startServer(inventoryServer, inventoryPort);
