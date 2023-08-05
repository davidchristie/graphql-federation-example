import { getAuthHeader } from "./get-auth-header.ts";
import { getToken } from "./get-token.ts";
import { getSignedInUser } from "./get-signed-in-user.ts";
import { SignedInUser } from "../types/signed-in-user.ts";

export function getSignedInUserFromRequest(input: {
  request: {
    headers: {
      get(name: string): string | null;
    };
  };
  publicKeyOrSecret: string;
}): SignedInUser | null {
  const authHeader = getAuthHeader({ request: input.request });
  const token = getToken({ authHeader });
  return getSignedInUser({ token, publicKeyOrSecret: input.publicKeyOrSecret });
}
