import jsonWebToken from "jsonwebtoken";
import { SignedInUser } from "../types/signed-in-user";

export function signToken(input: {
  signedInUser: SignedInUser;
  privateKeyOrSecret: string;
}): string {
  const payload = {
    ...input.signedInUser,
  };
  return jsonWebToken.sign(payload, input.privateKeyOrSecret);
}
