import { startServer } from "server-config";
import { createProductsServer } from "../server.js";

const port = 4003;
const productsServer = createProductsServer();

await startServer(productsServer, port);
