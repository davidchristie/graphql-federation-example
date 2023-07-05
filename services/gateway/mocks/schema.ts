import { createAccountsSchema, createMockAccountsApp } from "accounts";
import {
  GraphQLSchema,
  buildAppExecutor,
  stitchSchemas,
  stitchingDirectives,
} from "graphql-config";
import { createInventorySchema } from "inventory";
import { createMockProductsApp, createProductsSchema } from "products";
import { createMockReviewsApp, createReviewsSchema } from "reviews";
import { createPublicGatewaySchema } from "../main.js";

export function createMockPrivateGatewaySchema(): GraphQLSchema {
  const { stitchingDirectivesTransformer } = stitchingDirectives();
  return stitchSchemas({
    subschemaConfigTransforms: [stitchingDirectivesTransformer],
    subschemas: [
      {
        schema: createAccountsSchema(),
        executor: buildAppExecutor(createMockAccountsApp()),
      },
      {
        schema: createInventorySchema(),
      },
      {
        schema: createProductsSchema(),
        executor: buildAppExecutor(createMockProductsApp()),
      },
      {
        schema: createReviewsSchema(),
        executor: buildAppExecutor(createMockReviewsApp()),
      },
    ],
  });
}

export function createMockPublicGatewaySchema(): GraphQLSchema {
  return createPublicGatewaySchema(createMockPrivateGatewaySchema());
}
