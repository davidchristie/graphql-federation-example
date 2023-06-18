import { graphql } from "../../../generated/graphql";

export const signedInUserQuery = graphql(/* GraphQL */ `
  query SignedInUser {
    ...SignedInUser
  }
`);
