import { getAuthHeader, getSignedInUser } from "auth-config";
import { YogaServerInstance, createYoga } from "graphql-config";
import { Context } from "./context.js";
import { createAccountsSchema } from "./schema.js";

export interface CreateAccountsAppInput {
  auth: {
    privateKeyOrSecret: string;
    publicKeyOrSecret: string;
  };
}

export type AccountsApp = YogaServerInstance<Context, {}>;

export function createAccountsApp(input: CreateAccountsAppInput): AccountsApp {
  return createYoga({
    schema: createAccountsSchema(),
    context: ({ request }): Context => {
      const authHeader = getAuthHeader({ request });
      const signedInUser = getSignedInUser({
        authHeader,
        publicKeyOrSecret: input.auth.publicKeyOrSecret,
      });
      return {
        authHeader,
        signedInUser,
        secrets: {
          auth: {
            publicKeyOrSecret: input.auth.publicKeyOrSecret,
            privateKeyOrSecret: input.auth.privateKeyOrSecret,
          },
        },
      };
    },
    graphiql: {
      title: "Accounts",
      defaultQuery: `
{
  me {
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
