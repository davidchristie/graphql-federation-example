import { productsPort } from "dev-config";
import { startServer } from "server-config";
import { createProductsServer } from "../graphql/server.js";

const productsServer = createProductsServer();

await startServer(productsServer, productsPort);
