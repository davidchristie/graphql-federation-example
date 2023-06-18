import { TypedDocumentString } from "../generated/graphql/graphql";
import { getToken } from "../storage";

const defaultHeaders = {
  "content-type": "application/json",
};

export async function request<TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  variables?: unknown
): Promise<TResult> {
  const response = await fetch("/gateway/graphql", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      query: document.toString(),
      variables,
    }),
  });
  const { data } = await response.json();
  return data;
}

function getHeaders(): HeadersInit {
  const token = getToken();
  const headers: HeadersInit = { ...defaultHeaders };
  if (token !== undefined) {
    headers["authorization"] = `Bearer ${token}`;
  }
  return headers;
}
