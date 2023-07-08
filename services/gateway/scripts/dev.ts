import { gatewayPort } from "dev-config";
import { startServer } from "server-config";
import { createGatewayServer } from "../graphql/server.ts";

const gatewayServer = await createGatewayServer();

await startServer(gatewayServer, gatewayPort);
