import { authSecret } from "dev-config";
import { AccountsApp, createAccountsApp } from "../graphql/app.js";
import { InMemoryUserRepository } from "../adapters/in-memory-user-repository.js";
import { mockUsers } from "./users.js";

export function createMockAccountsApp(): AccountsApp {
  return createAccountsApp({
    ports: {
      userRepository: new InMemoryUserRepository(mockUsers),
    },
    auth: {
      privateKeyOrSecret: authSecret,
      publicKeyOrSecret: authSecret,
    },
  });
}
