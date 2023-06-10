import {
  Executor,
  GraphQLSchema,
  buildHTTPExecutor,
  buildSchema,
  isAsyncIterable,
  parse,
  stitchSchemas,
  stitchingDirectives,
} from "graphql-config";
import waitOn from "wait-on";

export async function createGatewaySchemaFromRemoteServices(): Promise<GraphQLSchema> {
  await waitOn({ resources: [4001, 4002, 4003, 4004].map((p) => `tcp:${p}`) });
  const { stitchingDirectivesTransformer } = stitchingDirectives();
  const accountsExec = buildHTTPExecutor({
    endpoint: "http://localhost:4001/graphql",
  });
  const inventoryExec = buildHTTPExecutor({
    endpoint: "http://localhost:4002/graphql",
  });
  const productsExec = buildHTTPExecutor({
    endpoint: "http://localhost:4003/graphql",
  });
  const reviewsExec = buildHTTPExecutor({
    endpoint: "http://localhost:4004/graphql",
  });
  return stitchSchemas({
    subschemaConfigTransforms: [stitchingDirectivesTransformer],
    subschemas: [
      {
        schema: await fetchRemoteSchema(accountsExec),
        executor: accountsExec,
      },
      {
        schema: await fetchRemoteSchema(inventoryExec),
        executor: inventoryExec,
      },
      {
        schema: await fetchRemoteSchema(productsExec),
        executor: productsExec,
      },
      {
        schema: await fetchRemoteSchema(reviewsExec),
        executor: reviewsExec,
      },
    ],
  });
}

async function fetchRemoteSchema(executor: Executor): Promise<GraphQLSchema> {
  const result = await executor({
    document: parse(`
      {
        _sdl
      }
    `),
  });
  if (isAsyncIterable(result)) {
    throw new Error("Expected executor to return a single result");
  }
  return buildSchema(result.data._sdl);
}
