import { Server, createServer } from "server-config";
import { AccountsApp } from "./app.js";

export function createAccountsServer(accountsApp: AccountsApp): Server {
  return createServer(accountsApp);
}
