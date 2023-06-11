import {
  GraphQLSchema,
  createSchema,
  stitchingDirectives,
} from "graphql-config";
import { typeDefs } from "./type-defs.js";
import { resolvers } from "./resolvers.js";

const { stitchingDirectivesValidator } = stitchingDirectives();

export function createInventorySchema(): GraphQLSchema {
  return stitchingDirectivesValidator(
    createSchema({
      typeDefs,
      resolvers,
    })
  );
}
