import { accountsPort } from "dev-config";
import { startServer } from "server-config";
import { createAccountsServer } from "../graphql/server.js";

const accountsServer = createAccountsServer();

await startServer(accountsServer, accountsPort);
