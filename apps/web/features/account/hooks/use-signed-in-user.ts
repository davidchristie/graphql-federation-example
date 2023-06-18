import { signedInUserQuery } from "../../../graphql/operations/queries/signed-in-user";
import { useGraphQLQuery } from "../../../graphql/use-graphql-query";
import { SignedInUser } from "../types/signed-in-user";

export interface SignedInUserResult {
  data: SignedInUser | undefined;
  isLoading: boolean;
  error: unknown | undefined;
}

export function useSignedInUser(): SignedInUserResult {
  const result = useGraphQLQuery(signedInUserQuery);
  return {
    data: result.data?.signedInUser ?? undefined,
    isLoading: result.isLoading,
    error: result.error,
  };
}
