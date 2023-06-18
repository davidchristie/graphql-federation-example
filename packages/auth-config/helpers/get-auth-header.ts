export function getAuthHeader(input: {
  request: {
    headers: {
      get(name: string): string | null;
    };
  };
}): string | null {
  return input.request.headers.get("authorization");
}
