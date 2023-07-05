import { AsyncExecutor } from "@graphql-tools/utils";
import { print } from "graphql";
import { YogaServerInstance } from "graphql-yoga";

export function buildAppExecutor<
  TUserContext extends Record<keyof TUserContext, unknown>
>(app: YogaServerInstance<{}, TUserContext>): AsyncExecutor {
  return async ({ document, variables, operationName, extensions }) => {
    const query = print(document);
    const fetchResult = await app.fetch(app.graphqlEndpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ query, variables, operationName, extensions }),
    });
    return fetchResult.json();
  };
}
