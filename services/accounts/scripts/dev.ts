import { accountsPort, authSecret } from "dev-config";
import { startServer } from "server-config";
import { createAccountsServer } from "../graphql/server.js";

const accountsServer = createAccountsServer({
  auth: {
    privateKeyOrSecret: authSecret,
    publicKeyOrSecret: authSecret,
  },
});

await startServer(accountsServer, accountsPort);
