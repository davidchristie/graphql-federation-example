import { Server, createServer } from "server-config";
import { createGatewayApp } from "./app.js";
import { createGatewaySchemaFromRemoteServices } from "./schema.js";

export function createGatewayServer(): Server {
  return createServer(
    createGatewayApp(createGatewaySchemaFromRemoteServices())
  );
}
