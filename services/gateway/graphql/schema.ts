import { GraphQLSchema, stitchRemoteSchemas } from "graphql-config";
import { waitForResources } from "server-config";

export async function createGatewaySchema(): Promise<GraphQLSchema> {
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
