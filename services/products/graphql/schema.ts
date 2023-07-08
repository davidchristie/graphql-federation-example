import {
  GraphQLSchema,
  createSchema,
  stitchingDirectives,
} from "graphql-config";
import { typeDefs } from "./type-defs.ts";
import { resolvers } from "./resolvers.ts";

const { stitchingDirectivesValidator } = stitchingDirectives();

export function createProductsSchema(): GraphQLSchema {
  return stitchingDirectivesValidator(
    createSchema({
      typeDefs,
      resolvers,
    })
  );
}
