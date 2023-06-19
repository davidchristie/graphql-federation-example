import { AsyncExecutor } from "@graphql-tools/utils";
import { print } from "graphql";
import { YogaServerInstance } from "graphql-yoga";

export function buildAppExecutor<
  TServerContext extends Record<string, any>,
  TUserContext extends Record<string, any>
>(app: YogaServerInstance<TServerContext, TUserContext>): AsyncExecutor {
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
