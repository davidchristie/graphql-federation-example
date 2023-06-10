import { YogaServerInstance, createYoga } from "graphql-config";
import { createAccountsSchema } from "./schema.js";

export function createAccountsApp(): YogaServerInstance<{}, {}> {
  return createYoga({
    schema: createAccountsSchema(),
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
