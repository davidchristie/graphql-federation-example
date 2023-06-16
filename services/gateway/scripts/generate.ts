import { createAccountsSchema } from "accounts";
import {
  printSchema,
  stitchSchemas,
  stitchingDirectives,
} from "graphql-config";
import { createInventorySchema } from "inventory";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createProductsSchema } from "products";
import { createReviewsSchema } from "reviews";

const { stitchingDirectivesTransformer } = stitchingDirectives();

const schema = stitchSchemas({
  subschemaConfigTransforms: [stitchingDirectivesTransformer],
  subschemas: [
    {
      schema: createAccountsSchema(),
    },
    {
      schema: createInventorySchema(),
    },
    {
      schema: createProductsSchema(),
    },
    {
      schema: createReviewsSchema(),
    },
  ],
});

const outputDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../generated/graphql"
);

if (!existsSync(outputDirectory)) {
  mkdirSync(outputDirectory, {
    recursive: true,
  });
}

writeFileSync(resolve(outputDirectory, "schema.graphql"), printSchema(schema));
