import { gatewayPort } from "dev-config";
import { startServer } from "server-config";
import { createGatewayServer } from "../graphql/server.js";

const gatewayServer = createGatewayServer();

await startServer(gatewayServer, gatewayPort);
