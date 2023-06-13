import { startServer } from "server-config";
import { createAccountsServer } from "../graphql/server.js";

const port = 4001;
const accountsServer = createAccountsServer();

await startServer(accountsServer, port);
