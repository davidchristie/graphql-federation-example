import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { stitchSchemas } from "@graphql-tools/stitch";
import { stitchingDirectives } from "@graphql-tools/stitching-directives";
import { Executor, isAsyncIterable } from "@graphql-tools/utils";
import { GraphQLSchema, buildSchema, parse } from "graphql";

export async function stitchRemoteSchemas(input: {
  endpoints: string[];
}): Promise<GraphQLSchema> {
  const { stitchingDirectivesTransformer } = stitchingDirectives();
  const executors = input.endpoints.map((endpoint) => {
    console.log("Fetching remote schema: ", endpoint);
    return buildHTTPExecutor({
      endpoint,
    });
  });
  return stitchSchemas({
    subschemaConfigTransforms: [stitchingDirectivesTransformer],
    subschemas: await Promise.all(
      executors.map(async (executor) => ({
        schema: await fetchRemoteSchema(executor),
        executor,
      }))
    ),
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
