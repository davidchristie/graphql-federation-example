import { Ports } from "../ports/index.js";
import { FindUser } from "./find-user.js";
import { SignIn } from "./sign-in.js";
import { VerifyToken } from "./verify-token.js";

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
