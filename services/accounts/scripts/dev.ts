import { accountsPort } from "dev-config";
import { startServer } from "server-config";
import { createAccountsServer } from "../graphql/server.ts";
import { createMockAccountsApp } from "../mocks/app.ts";

const accountsServer = createAccountsServer(createMockAccountsApp());

await startServer(accountsServer, accountsPort);
