import { gql, stitchingDirectives } from "graphql-config";

const { stitchingDirectivesTypeDefs, stitchingDirectivesValidator } =
  stitchingDirectives();

export const typeDefs = gql`
  ${stitchingDirectivesTypeDefs}
  type User @canonical {
    id: ID!
    name: String!
    username: String!
  }

  type Query {
    me: User
    user(id: ID!): User @merge(keyField: "id")
    _sdl: String!
  }
`;
