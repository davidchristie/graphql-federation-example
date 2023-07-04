import { Server, createServer } from "server-config";
import { createGatewayApp } from "./app.js";
import { createPrivateGatewaySchema } from "./schema.js";

export async function createGatewayServer(): Promise<Server> {
  return createServer(createGatewayApp(await createPrivateGatewaySchema()));
}
