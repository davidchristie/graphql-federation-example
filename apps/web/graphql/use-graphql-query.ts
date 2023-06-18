import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { TypedDocumentString } from "../generated/graphql/graphql";
import { request } from "./request";

export type UseGraphQLQueryResult<
  TData = unknown,
  TError = unknown
> = UseQueryResult<TData, TError>;

export function useGraphQLQuery<TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseGraphQLQueryResult<TResult> {
  return useQuery([document, variables] as const, async ({ queryKey }) =>
    request(queryKey[0], queryKey[1])
  );
}
