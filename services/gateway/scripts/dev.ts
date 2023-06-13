import { startServer } from "server-config";
import { createGatewayServer } from "../graphql/server.js";

const port = 4000;
const gatewayServer = createGatewayServer();

await startServer(gatewayServer, port);
