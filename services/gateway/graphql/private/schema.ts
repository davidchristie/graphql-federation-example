import {
  accountsEndpoint,
  inventoryEndpoint,
  productsEndpoint,
  reviewsEndpoint,
} from "dev-config";
import { GraphQLSchema, stitchRemoteSchemas } from "graphql-config";
import { waitForResources } from "server-config";

export async function createPrivateGatewaySchema(): Promise<GraphQLSchema> {
  const endpoints = [
    process.env.ACCOUNTS_ENDPOINT ?? accountsEndpoint,
    process.env.INVENTORY_ENDPOINT ?? inventoryEndpoint,
    process.env.PRODUCTS_ENDPOINT ?? productsEndpoint,
    process.env.REVIEWS_ENDPOINT ?? reviewsEndpoint,
  ];
  await waitForResources({
    resources: endpoints,
    headers: {
      accept: "text/html",
    },
  });
  return stitchRemoteSchemas({
    endpoints,
    headers: (executorRequest) => ({
      authorization: executorRequest?.context?.authHeader,
    }),
  });
}
