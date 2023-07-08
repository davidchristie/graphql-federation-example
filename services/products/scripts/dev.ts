import { productsPort } from "dev-config";
import { startServer } from "server-config";
import { createProductsServer } from "../graphql/server.ts";
import { createMockProductsApp } from "../mocks/app.ts";

const productsServer = createProductsServer(createMockProductsApp());

await startServer(productsServer, productsPort);
