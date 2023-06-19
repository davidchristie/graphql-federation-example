const bearerPrefix = "Bearer ";

export function getToken(input: { authHeader: string | null }): string | null {
  if (input.authHeader === null || !input.authHeader.startsWith(bearerPrefix)) {
    return null;
  }
  return input.authHeader.slice(bearerPrefix.length);
}
