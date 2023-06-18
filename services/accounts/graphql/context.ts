import { User } from "../core/entities/user.js";

export interface Context {
  authHeader: string | null;
  signedInUser: User | null;
  secrets: {
    auth: {
      privateKeyOrSecret: string;
      publicKeyOrSecret: string;
    };
  };
}
