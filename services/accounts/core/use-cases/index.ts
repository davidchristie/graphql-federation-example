import { Ports } from "../ports/index.ts";
import { AdminListUsers } from "./admin-list-users.ts";
import { FindUser } from "./find-user.ts";
import { SignIn } from "./sign-in.ts";

export interface UseCases {
  adminListUsers: AdminListUsers;
  findUser: FindUser;
  signIn: SignIn;
}

export function createUseCases(options: {
  ports: Ports;
  privateKeyOrSecret: string;
}): UseCases {
  return {
    adminListUsers: new AdminListUsers({
      userRepository: options.ports.userRepository,
    }),
    findUser: new FindUser({
      userRepository: options.ports.userRepository,
    }),
    signIn: new SignIn({
      userRepository: options.ports.userRepository,
      privateKeyOrSecret: options.privateKeyOrSecret,
    }),
  };
}
