import jsonWebToken from "jsonwebtoken";
import { SignedInUser, signedInUserSchema } from "../types/signed-in-user.js";

export function getSignedInUser(input: {
  token: string | null;
  publicKeyOrSecret: string;
}): SignedInUser | null {
  if (!input.token) {
    return null;
  }
  try {
    const payload = jsonWebToken.verify(input.token, input.publicKeyOrSecret);
    return signedInUserSchema.parse(payload);
  } catch (error) {
    console.log("Invalid token:", error);
    return null;
  }
}
