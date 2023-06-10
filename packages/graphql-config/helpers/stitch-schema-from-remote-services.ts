import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { stitchSchemas } from "@graphql-tools/stitch";
import { stitchingDirectives } from "@graphql-tools/stitching-directives";
import { Executor, isAsyncIterable } from "@graphql-tools/utils";
import { GraphQLSchema, buildSchema, parse } from "graphql";
import waitOn from "wait-on";

interface Service {
  host: string;
  path: string;
  protocol: "http";
}

export async function stitchSchemaFromRemoteServices(input: {
  services: Service[];
}): Promise<GraphQLSchema> {
  await waitOn({
    resources: input.services.map(getServiceEndpoint),
  });
  const { stitchingDirectivesTransformer } = stitchingDirectives();
  const executors = input.services.map((service) =>
    buildHTTPExecutor({
      endpoint: getServiceEndpoint(service),
    })
  );
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

function getServiceEndpoint(service: Service): string {
  return `${service.protocol}://${service.host}/${service.path}`;
}
