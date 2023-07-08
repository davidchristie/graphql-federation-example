import { User } from "../core/entities/user.ts";
import { UseCases } from "../core/use-cases/index.ts";

export interface Context {
  signedInUser: User | null;
  useCases: UseCases;
}
