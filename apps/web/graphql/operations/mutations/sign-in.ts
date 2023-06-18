import { graphql } from "../../../generated/graphql";

export const signInMutation = graphql(/* GraphQL */ `
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      query {
        ...SignedInUser
      }
    }
  }
`);
