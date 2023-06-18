import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { type ExecutionResult } from "graphql-config";
import { TypedDocumentString } from "../generated/graphql/graphql";
import { request } from "./request";

export type UseGraphQLMutationResult<
  TData = unknown,
  TError = unknown
> = UseMutationResult<TData, TError>;

export function useGraphQLMutation<TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>
): UseMutationResult<TResult, unknown, TVariables> {
  return useMutation((variables) => request(document, variables));
}
