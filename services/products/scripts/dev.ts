import { startServer } from "server-config";
import { createProductsServer } from "../graphql/server.js";

const port = 4003;
const productsServer = createProductsServer();

await startServer(productsServer, port);
