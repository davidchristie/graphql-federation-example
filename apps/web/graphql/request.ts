import { type ExecutionResult } from "graphql";
import { TypedDocumentString } from "../generated/graphql/graphql";

export async function request<TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  variables?: unknown
): Promise<ExecutionResult<TResult>> {
  const response = await fetch("/gateway/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: document.toString(),
      variables,
    }),
  });
  const { data } = await response.json();
  return data;
}
