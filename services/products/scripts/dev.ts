import { productsPort } from "dev-config";
import { startServer } from "server-config";
import { createProductsServer } from "../graphql/server.js";
import { createMockProductsApp } from "../mocks/app.js";

const productsServer = createProductsServer(createMockProductsApp());

await startServer(productsServer, productsPort);
