import { useSignedInUserQuery } from "../../../generated/graphql";
import { SignedInUser } from "../types/signed-in-user";

export interface SignedInUserResult {
  isLoading: boolean;
  data: SignedInUser | undefined;
  error: Error | undefined;
}

export function useSignedInUser(): SignedInUserResult {
  const result = useSignedInUserQuery();
  return {
    isLoading: result.loading,
    data: result.data?.signedInUser
      ? {
          id: result.data.signedInUser.id,
          name: result.data.signedInUser.name,
          username: result.data.signedInUser.username,
        }
      : undefined,
    error: result.error,
  };
}
