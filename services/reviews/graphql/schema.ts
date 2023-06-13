import {
  GraphQLSchema,
  createSchema,
  stitchingDirectives,
} from "graphql-config";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./type-defs.js";

const { stitchingDirectivesValidator } = stitchingDirectives();

export function createReviewsSchema(): GraphQLSchema {
  return stitchingDirectivesValidator(
    createSchema({
      typeDefs,
      resolvers,
    })
  );
}
