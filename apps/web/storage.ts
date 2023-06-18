const tokenKey = "token";

export function clearToken(): void {
  localStorage.removeItem(tokenKey);
}

export function getToken(): string | undefined {
  return localStorage.getItem(tokenKey) ?? undefined;
}

export function setToken(token: string): void {
  localStorage.setItem(tokenKey, token);
}
