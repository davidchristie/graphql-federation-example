import { startServer } from "server-config";
import { createGatewayServer } from "../server.js";

const port = 4000;
const gatewayServer = createGatewayServer();

await startServer(gatewayServer, port);
