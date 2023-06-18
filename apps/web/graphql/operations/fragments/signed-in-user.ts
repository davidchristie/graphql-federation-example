import { graphql } from "../../../generated/graphql";

export const SignedInUserFragment = graphql(/* GraphQL */ `
  fragment SignedInUser on Query {
    signedInUser {
      id
      name
      username
    }
  }
`);
