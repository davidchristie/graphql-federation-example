import jsonWebToken from "jsonwebtoken";
import { SignedInUser, signedInUserSchema } from "../types/signed-in-user.js";

const bearerPrefix = "Bearer ";

export function getSignedInUser(input: {
  authHeader: string | null;
  publicKeyOrSecret: string;
}): SignedInUser | null {
  if (input.authHeader === null || !input.authHeader.startsWith(bearerPrefix)) {
    return null;
  }
  const token = input.authHeader.slice(bearerPrefix.length);
  try {
    const payload = jsonWebToken.verify(token, input.publicKeyOrSecret);
    return signedInUserSchema.parse(payload);
  } catch (error) {
    console.log("Invalid token:", error);
    return null;
  }
}
