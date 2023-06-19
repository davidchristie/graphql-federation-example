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
    signedInUser: User
    user(id: ID!): User @merge(keyField: "id")
    _sdl: String!
  }

  type Mutation {
    signIn(input: SignInInput!): SignInPayload!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignInPayload {
    token: String!
    query: Query!
  }
`;
