import { accountsPort } from "dev-config";
import { startServer } from "server-config";
import { createAccountsServer } from "../graphql/server.js";
import { createMockAccountsApp } from "../mocks/app.js";

const accountsServer = createAccountsServer(createMockAccountsApp());

await startServer(accountsServer, accountsPort);
