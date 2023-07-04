import {
  GraphQLSchema,
  filterSchema,
  pruneSchema,
  stitchRemoteSchemas,
} from "graphql-config";
import { waitForResources } from "server-config";

export async function createPrivateGatewaySchema(): Promise<GraphQLSchema> {
  const hosts = [
    process.env.ACCOUNTS_HOST ?? "http://localhost:4001",
    process.env.INVENTORY_HOST ?? "http://localhost:4002",
    process.env.PRODUCTS_HOST ?? "http://localhost:4003",
    process.env.REVIEWS_HOST ?? "http://localhost:4004",
  ];
  await waitForResources({
    resources: hosts,
    headers: {
      accept: "text/html",
    },
  });
  const endpoints = hosts.map((host) => `${host}/graphql`);
  return stitchRemoteSchemas({
    endpoints,
    headers: (executorRequest) => ({
      authorization: executorRequest?.context?.authHeader,
    }),
  });
}

export function createPublicGatewaySchema(
  privateSchema: GraphQLSchema
): GraphQLSchema {
  return pruneSchema(
    filterSchema({
      schema: privateSchema,
      rootFieldFilter: (_type, fieldName) => !fieldName.startsWith("_"),
      fieldFilter: (_type, fieldName) => !fieldName.startsWith("_"),
      argumentFilter: (_typeName, _fieldName, argName) =>
        !argName?.startsWith("_"),
    })
  );
}
