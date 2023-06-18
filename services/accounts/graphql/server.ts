import { Server, createServer } from "server-config";
import { CreateAccountsAppInput, createAccountsApp } from "./app.js";

export interface CreateAccountsServerInput extends CreateAccountsAppInput {}

export function createAccountsServer(input: CreateAccountsServerInput): Server {
  return createServer(createAccountsApp(input));
}
