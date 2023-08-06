import { authSecret, seedUsers } from "dev-config";
import { AccountsApp, createAccountsApp } from "../graphql/app.ts";
import { InMemoryUserRepository } from "../adapters/in-memory-user-repository.ts";

export function createMockAccountsApp(): AccountsApp {
  return createAccountsApp({
    ports: {
      userRepository: new InMemoryUserRepository(seedUsers),
    },
    auth: {
      privateKeyOrSecret: authSecret,
      publicKeyOrSecret: authSecret,
    },
  });
}
