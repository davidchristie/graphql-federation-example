import { useUsersQuery } from "../../../generated/graphql.ts";
import { UserSummary } from "../types/user-summary.ts";

export interface UsersResult {
  isLoading: boolean;
  data: UserSummary[] | undefined;
  error: Error | undefined;
}

export function useUsers(): UsersResult {
  const result = useUsersQuery();
  return {
    isLoading: result.loading,
    data: result.data?._adminListUsers.flatMap((user) => (user ? [user] : [])),
    error: result.error,
  };
}
