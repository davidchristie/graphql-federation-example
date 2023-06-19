import { accountsPort, authSecret } from "dev-config";
import { startServer } from "server-config";
import { createAccountsServer } from "../graphql/server.js";
import { createAccountsApp } from "../graphql/app.js";
import { InMemoryUserRepository } from "../adapters/in-memory-user-repository.js";
import { mockUsers } from "../core/mock-data/users.js";

const accountsServer = createAccountsServer(
  createAccountsApp({
    ports: {
      userRepository: new InMemoryUserRepository(mockUsers),
    },
    auth: {
      privateKeyOrSecret: authSecret,
      publicKeyOrSecret: authSecret,
    },
  })
);

await startServer(accountsServer, accountsPort);
