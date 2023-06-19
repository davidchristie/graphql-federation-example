import { User } from "../entities/user.js";

export interface UserRepository {
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
}
