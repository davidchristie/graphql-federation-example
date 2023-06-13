import { startServer } from "server-config";
import { createInventoryServer } from "../graphql/server.js";

const port = 4002;
const inventoryServer = createInventoryServer();

await startServer(inventoryServer, port);
