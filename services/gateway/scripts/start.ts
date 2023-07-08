import { gatewayPort } from "dev-config";
import { startServer } from "server-config";
import { createGatewayServer } from "../graphql/server.ts";

async function start(): Promise<void> {
  const gatewayServer = await createGatewayServer();
  await startServer(gatewayServer, gatewayPort);
}

start();
