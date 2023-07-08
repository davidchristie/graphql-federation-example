import { GraphQLSchema, printSchema } from "graphql-config";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createMockPrivateGatewaySchema,
  createMockPublicGatewaySchema,
} from "../mocks/schema.ts";

const privateSchema = createMockPrivateGatewaySchema();
const publicSchema = createMockPublicGatewaySchema();
const privateOutputDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../generated/graphql/private"
);
const publicOutputDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../generated/graphql/public"
);

function writeSchemaToFile(directory: string, schema: GraphQLSchema): void {
  if (!existsSync(directory)) {
    mkdirSync(directory, {
      recursive: true,
    });
  }
  writeFileSync(resolve(directory, "schema.graphql"), printSchema(schema));
}

writeSchemaToFile(privateOutputDirectory, privateSchema);
writeSchemaToFile(publicOutputDirectory, publicSchema);
