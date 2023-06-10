import { Server, createServer } from "server-config";
import { createAccountsApp } from "./app.js";

export function createAccountsServer(): Server {
  return createServer(createAccountsApp());
}
