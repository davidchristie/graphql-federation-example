import { User } from "../core/entities/user.js";
import { UseCases } from "../core/use-cases/index.js";

export interface Context {
  signedInUser: User | null;
  useCases: UseCases;
}
