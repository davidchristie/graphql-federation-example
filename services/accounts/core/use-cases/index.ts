import { Ports } from "../ports/index.ts";
import { FindUser } from "./find-user.ts";
import { SignIn } from "./sign-in.ts";
import { VerifyToken } from "./verify-token.ts";

export interface UseCases {
  findUser: FindUser;
  signIn: SignIn;
  verifyToken: VerifyToken;
}

export function createUseCases(options: {
  ports: Ports;
  privateKeyOrSecret: string;
  publicKeyOrSecret: string;
}): UseCases {
  return {
    findUser: new FindUser({
      userRepository: options.ports.userRepository,
    }),
    signIn: new SignIn({
      userRepository: options.ports.userRepository,
      privateKeyOrSecret: options.privateKeyOrSecret,
    }),
    verifyToken: new VerifyToken({
      publicKeyOrSecret: options.publicKeyOrSecret,
    }),
  };
}
