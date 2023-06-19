import { UserRepository } from "./user-repository.js";

export interface Ports {
  userRepository: UserRepository;
}
