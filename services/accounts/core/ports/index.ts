import { UserRepository } from "./user-repository.ts";

export interface Ports {
  userRepository: UserRepository;
}
