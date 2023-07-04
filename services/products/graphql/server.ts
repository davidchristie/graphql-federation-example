import { Server, createServer } from "server-config";
import { ProductsApp } from "./app.js";

export function createProductsServer(productsApp: ProductsApp): Server {
  return createServer(productsApp);
}
