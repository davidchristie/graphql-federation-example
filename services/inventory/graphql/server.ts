import { Server, createServer } from "server-config";
import { InventoryApp } from "./app.ts";

export function createInventoryServer(inventoryApp: InventoryApp): Server {
  return createServer(inventoryApp);
}
