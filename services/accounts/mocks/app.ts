import { authSecret } from "dev-config";
import { AccountsApp, createAccountsApp } from "../graphql/app.ts";
import { InMemoryUserRepository } from "../adapters/in-memory-user-repository.ts";
import { mockUsers } from "./users.ts";

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
