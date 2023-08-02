import { getAuthHeader } from "./get-auth-header";
import { getToken } from "./get-token";
import { getSignedInUser } from "./get-signed-in-user";
import { SignedInUser } from "../types/signed-in-user";

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
