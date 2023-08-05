import { SignedInUser } from "auth-config";
import { UseCases } from "../core/use-cases/index.ts";

export interface Context {
  signedInUser: SignedInUser | null;
  useCases: UseCases;
}
