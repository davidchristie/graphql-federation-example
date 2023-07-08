import {
  GraphQLSchema,
  createSchema,
  stitchingDirectives,
} from "graphql-config";
import { resolvers } from "./resolvers.ts";
import { typeDefs } from "./type-defs.ts";

const { stitchingDirectivesValidator } = stitchingDirectives();

export function createInventorySchema(): GraphQLSchema {
  return stitchingDirectivesValidator(
    createSchema({
      typeDefs,
      resolvers,
    })
  );
}
