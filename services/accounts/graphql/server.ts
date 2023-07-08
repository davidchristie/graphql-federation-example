import { Server, createServer } from "server-config";
import { AccountsApp } from "./app.ts";

export function createAccountsServer(accountsApp: AccountsApp): Server {
  return createServer(accountsApp);
}
