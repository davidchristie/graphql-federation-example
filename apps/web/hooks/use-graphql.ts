import { ExecutionResult } from "graphql";
import { useQuery } from "@tanstack/react-query";
import { TypedDocumentString } from "../generated/graphql/graphql";

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  return useQuery([document, variables] as const, async ({ queryKey }) => {
    return fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queryKey[0].toString(),
        variables: queryKey[1],
      }),
    }).then((response) => response.json()) as Promise<ExecutionResult<TResult>>;
  });
}
