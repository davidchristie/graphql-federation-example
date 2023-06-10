import { createGatewayServer } from "../server.js";
import { startServer } from "server-config";

const port = 4000;
const gatewayServer = createGatewayServer();

await startServer(gatewayServer, port);
