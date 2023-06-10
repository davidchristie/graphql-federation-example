import { GraphQLSchema, stitchSchemaFromRemoteServices } from "graphql-config";

export async function createGatewaySchemaFromRemoteServices(): Promise<GraphQLSchema> {
  return stitchSchemaFromRemoteServices({
    services: [4001, 4002, 4003, 4004].map((port) => ({
      host: `localhost:${port}`,
      path: "/graphql",
      protocol: "http",
    })),
  });
}
