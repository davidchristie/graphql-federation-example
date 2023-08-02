import { getSignedInUserFromRequest } from "auth-config";
import { YogaServerInstance, createYoga } from "graphql-config";
import { Context } from "./context.ts";
import { createAccountsSchema } from "./schema.ts";
import { createUseCases } from "../core/use-cases/index.ts";
import { Ports } from "../core/ports/index.ts";

export type AccountsApp = YogaServerInstance<Record<string, unknown>, Context>;

export function createAccountsApp(options: {
  ports: Ports;
  auth: {
    publicKeyOrSecret: string;
    privateKeyOrSecret: string;
  };
}): AccountsApp {
  const useCases = createUseCases({
    ports: options.ports,
    privateKeyOrSecret: options.auth.privateKeyOrSecret,
  });
  return createYoga({
    schema: createAccountsSchema(),
    context: async ({ request }) => {
      const signedInUser = getSignedInUserFromRequest({
        request,
        publicKeyOrSecret: options.auth.publicKeyOrSecret,
      });
      return {
        signedInUser,
        useCases,
      };
    },
    landingPage: false,
    graphiql: {
      title: "Accounts",
      defaultQuery: `
  {
    signedInUser {
      id
      name
      username
    }
    user(id: "2") {
      id
      name
      username
    }
  }
        `.trim(),
    },
  });
}
